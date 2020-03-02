// Copyright 2015-2019 Palo Alto Networks, Inc
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//       http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as http2 from 'http2'
import { commonLogger, logLevel } from './commonlogger'
import { Credentials } from '.'
import { ErrorTypes, SdkError } from './sdkError'
import { cortexConstants } from './constants'

const {
    HTTP2_METHOD_GET,
    HTTP2_METHOD_DELETE,
    HTTP2_METHOD_POST,
    HTTP2_METHOD_PUT,
    HTTP2_HEADER_PATH,
    HTTP2_HEADER_METHOD,
    HTTP2_HEADER_STATUS,
    HTTP2_HEADER_AUTHORIZATION,
    HTTP2_HEADER_CONTENT_TYPE,
    HTTP2_HEADER_CONTENT_LENGTH
} = http2.constants

const { APIEPMAP } = cortexConstants

let seqno = Math.floor(Math.random() * 10000)

/**
 * Error subclass that allows the developer get insights on reasons for a HTTP2 error
 */
export class Http2FetchError extends Error {
    /**
     * Value of the HTTP2 status header that triggered the error
     */
    status: number
    /**
     * Body of the HTTP2 response that triggered the errror
     */
    data: any

    constructor(message: string, status: number, data: any) {
        super(message)
        this.status = status
        this.data = data
    }
}

/**
 * Options to configure a `Http2Fetch` object
 */
export interface Http2FetchOpts extends http2.ClientSessionOptions, http2.SecureClientSessionOptions {
    /**
     * Cortex API default FQDN to use in operations that do not provide an
     * explicit `Credentials` object
     */
    cortexBaseFqdn?: string
    /**
     * If provided, then all operations will use this `Credential`'s JWT token
     */
    cortexDefCredentials?: Credentials
    /**
     * How many milliseconds to keep an inactive HTTP2 session to the Cortex API
     * GW (default = 60000)
     */
    cortexTimeout?: number
}

/**
 * Credential tuple
 */
export type CredentialTuple = {
    /**
     * Data lake unique identifier for this credential object
     */
    dlid: string,
    /**
     * Credential object
     */
    cred: Credentials,
    /**
     * the CDL API entry point fqdn
     */
    entrypoint: string
}

/**
 * Class that implements a HTTP2 fetch object
 */
export class Http2Fetch {
    private sessions: {
        [entrypoint: string]: {
            session?: http2.ClientHttp2Session,
            defaultAuthHeader?: string
            authHeader: { [tokenId: string]: string }
        }
    }
    private defaultEntrypoint: string
    private defaultCred?: CredentialTuple
    private opts?: Http2FetchOpts
    private cortexTimeout: number

    /**
     * Instantiates a new `Http2Fetch` object from provided configuration
     * options. You must provide, at least, `cortexBaseFqdn` or `cortexDefCredentials`
     * @param opts configuration options for this object
     * @returns an instantiated `Http2Fetch` object
     */
    constructor(opts?: Http2FetchOpts) {
        if (!(opts && (opts.cortexDefCredentials || opts.cortexBaseFqdn))) {
            commonLogger(logLevel.INFO, `Neither 'cortexBaseFqdn' nor 'cortexDefCredentials' was provided. Will default to '${APIEPMAP['americas']}'`)
        }
        this.opts = opts
        this.defaultCred = opts && opts.cortexDefCredentials && { cred: opts.cortexDefCredentials, entrypoint: opts.cortexDefCredentials.getEntryPoint(), dlid: "" }
        this.defaultEntrypoint = opts && opts.cortexBaseFqdn || APIEPMAP['americas']
        this.sessions = {}
        this.cortexTimeout = opts && opts.cortexTimeout || 10000
    }

    async init(c?: CredentialTuple): Promise<void> {
        await this.refreshSessions(c)
    }

    private async refreshSessions(c?: CredentialTuple): Promise<http2.ClientHttp2Session> {
        if (c) {
            const targetFqdn = c && c.entrypoint
            if (!(this.sessions[targetFqdn])) {
                this.sessions[targetFqdn] = {
                    authHeader: {}
                }
            }
            await this.lazyUpdateHeaders(c)
            return this.lazyInit(targetFqdn)
        }
        if (this.defaultCred) {
            const targetFqdn = this.defaultCred.entrypoint
            if (!(this.sessions[targetFqdn])) {
                this.sessions[targetFqdn] = {
                    authHeader: {}
                }
            }
            await this.lazyUpdateHeaders()
            return this.lazyInit(targetFqdn)
        }
        return this.lazyInit(this.defaultEntrypoint)
    }

    private lazyInit(targetFqdn: string): Promise<http2.ClientHttp2Session> {
        const targetSession = this.sessions[targetFqdn] && this.sessions[targetFqdn].session
        if (targetSession == undefined || targetSession.closed || targetSession.destroyed) {
            return new Promise((res, rej) => {
                const h2session = http2.connect(`https://${targetFqdn}:443`, this.opts)
                h2session.on('connect', (sess) => {
                    h2session.setTimeout(this.cortexTimeout, () => {
                        commonLogger(logLevel.INFO, `HTTP2 session destroyed because of timeout`)
                        h2session.destroy()
                    })
                    commonLogger(logLevel.INFO, `Created new HTTP2 session to ${targetFqdn}`)
                    if (this.sessions[targetFqdn]) {
                        this.sessions[targetFqdn].session = sess
                    } else {
                        this.sessions[targetFqdn] = {
                            session: sess,
                            authHeader: {}
                        }
                    }
                    res(sess)
                })
                h2session.on('error', rej)
            })
        }
        return Promise.resolve(targetSession)
    }

    private async lazyUpdateHeaders(c?: CredentialTuple): Promise<void> {
        if (c) {
            let authHeader = this.sessions[c.entrypoint].authHeader[c.dlid]
            if (!authHeader) {
                authHeader = 'Bearer ' + await c.cred.getToken(true)
                if (this.sessions[c.entrypoint]) {
                    this.sessions[c.entrypoint].authHeader[c.dlid] = authHeader
                } else {
                    this.sessions[c.entrypoint] = {
                        authHeader: { [c.dlid]: authHeader }
                    }
                }
                commonLogger(logLevel.INFO, `initial autorization header for data lake id ${c.dlid}`)
                return
            }

            const accessToken = await c.cred.getToken()
            if (accessToken) {
                authHeader = 'Bearer ' + accessToken
                if (this.sessions[c.entrypoint]) {
                    this.sessions[c.entrypoint].authHeader[c.dlid] = authHeader
                } else {
                    this.sessions[c.entrypoint] = {
                        authHeader: { [c.dlid]: authHeader }
                    }
                }
                commonLogger(logLevel.INFO, `updated autorization header for data lake id ${c.dlid}`)
            }
            return
        }

        if (this.defaultCred) {
            const targetFqdn = this.defaultCred.entrypoint
            let authHeader = this.sessions[targetFqdn].defaultAuthHeader
            if (!authHeader) {
                authHeader = 'Bearer ' + await this.defaultCred.cred.getToken(true)
                if (this.sessions[targetFqdn]) {
                    this.sessions[targetFqdn].defaultAuthHeader = authHeader
                } else {
                    this.sessions[targetFqdn] = {
                        defaultAuthHeader: authHeader,
                        authHeader: {}
                    }
                }
                commonLogger(logLevel.INFO, 'initial autorization header for default data lake')
                return
            }
            const accessToken = await this.defaultCred.cred.getToken()
            if (accessToken) {
                authHeader = 'Bearer ' + accessToken
                if (this.sessions[targetFqdn]) {
                    this.sessions[targetFqdn].defaultAuthHeader = authHeader
                } else {
                    this.sessions[targetFqdn] = {
                        defaultAuthHeader: authHeader,
                        authHeader: {}
                    }
                }
                commonLogger(logLevel.INFO, 'updated autorization header for default data lake')
            }
            return
        }
        throw new SdkError('ConfigError', 'bug: unexpected call to updateHeaders() without credentials (or default one)')
    }

    /**
     * Attemps to close the underlying session (if any)
     */
    async close(entryPoint?: string): Promise<void> {
        if (entryPoint) {
            const targetSession = this.sessions[entryPoint].session
            if (targetSession) {
                await new Promise((res, rej) => {
                    targetSession.close(res)
                })
                delete this.sessions[entryPoint]
            }
            return
        }
        let closePromises: Promise<void>[] = []
        for (const targetSession of Object.values(this.sessions).map(x => x.session))
            if (targetSession)
                closePromises.push(new Promise((res, rej) => {
                    targetSession.close(res)
                }))
        await Promise.all(closePromises)
        this.sessions = {}
    }

    private async op(
        method: string,
        path: string,
        body?: any,
        contentType?: string,
        opts?: http2.ClientSessionRequestOptions,
        cred?: CredentialTuple
    ): Promise<{ data: any, status: number }> {

        const targetSession = await this.refreshSessions(cred)

        let headers: http2.OutgoingHttpHeaders = {
            [HTTP2_HEADER_METHOD]: method,
            [HTTP2_HEADER_PATH]: path,
        }
        if (cred) {
            headers[HTTP2_HEADER_AUTHORIZATION] = this.sessions[cred.entrypoint].authHeader[cred.dlid]
        } else if (this.defaultCred) {
            headers[HTTP2_HEADER_AUTHORIZATION] = this.sessions[this.defaultCred.entrypoint].defaultAuthHeader
        }
        let writeBuffer: Buffer
        if (body !== undefined) {
            writeBuffer = Buffer.from(JSON.stringify(body))
            headers[HTTP2_HEADER_CONTENT_TYPE] = contentType
            headers[HTTP2_HEADER_CONTENT_LENGTH] = writeBuffer.length
        }
        if (method == HTTP2_METHOD_GET) opts = { ...opts, endStream: true }

        commonLogger(logLevel.DEBUG, `[${++seqno}] http2 request operation. Method ${method}, Path: ${path}`)
        Object.entries(headers).map(x => {
            if (x[0] == HTTP2_HEADER_AUTHORIZATION)
                return [x[0], (x[1] as string).slice(0, 12) + "..." + (x[1] as string).slice(-4)]
            else return x
        }).forEach(x => {
            commonLogger(logLevel.DEBUG, `[${seqno}] http2 request header '${x[0]}: ${x[1]}'`)
        })
        const stream = targetSession.request(headers, opts)
        /*
        stream.on('ready', (...e) => console.log("READY", e))
        stream.on('aborted', (...e) => console.log("ABORTED", e))
        stream.on('frameError', (...e) => console.log("FRAMEERROR", e))
        stream.on('timeout', (...e) => console.log("TIMEOUT", e))
        */

        let status: number
        let responseContentType: string | string[] | undefined
        stream.on('response', headers => {
            commonLogger(logLevel.DEBUG, `[${seqno}] Response headers: ${JSON.stringify(headers)}`)
            status = Number.parseFloat(headers[HTTP2_HEADER_STATUS] as string)
            responseContentType = headers[HTTP2_HEADER_CONTENT_TYPE]
        })
        let writePromise = (body === undefined) ? Promise.resolve() : new Promise<void>((res, rej) => {
            try {
                stream.end(writeBuffer, () => {
                    commonLogger(logLevel.DEBUG, `[${seqno}] http2 payload write: ${writeBuffer.toString()}`)
                    res();
                })
            } catch (e) { rej(e) }
        })
        let readPromise = new Promise((res, rej) => {
            let data = ''
            stream.on('data', chunk => data += chunk)
            stream.on('end', () => process.nextTick(() => {
                if (data.length == 0) {
                    commonLogger(logLevel.DEBUG, `[${seqno}] http2 read: null`)
                    return res()
                }
                commonLogger(logLevel.DEBUG, `[${seqno}] http2 read: ${data.length < 200 && data || data.slice(0, 198) + " ..."}`)
                if (responseContentType && typeof responseContentType == 'string' && responseContentType == 'application/json') {
                    return res(JSON.parse(data))
                }
                return res(data)
            }))
            stream.on('close', () => { })
            stream.on('error', e => {
                rej(e)
            })
        })
        return new Promise((res, rej) => Promise.all([readPromise, writePromise]).then(([x]) => {
            if (isNaN(status) || status >= 400) {
                commonLogger(logLevel.INFO, `Non-2xx/3xx Status Code. status: ${status}, data: ${JSON.stringify(x)}`)
                rej(new Http2FetchError('Non-2xx/3xx Status Code', status, x))
            } else {
                res({ data: x, status: status })
            }
        }, rej))
    }

    /**
     * Execute a HTTP2 GET operation
     * @param path relative path of the endpoint to consume
     * @param opts options for the HTTP2 request
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    get(path: string, opts?: http2.ClientSessionRequestOptions, cred?: CredentialTuple): Promise<{ data: any, status: number }> {
        return this.op(HTTP2_METHOD_GET, path, undefined, undefined, { ...opts, endStream: true }, cred)
    }

    /**
     * Execute a HTTP2 DELETE operation
     * @param path relative path of the endpoint to consume
     * @param opts options for the HTTP2 request
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    delete(path: string, opts?: http2.ClientSessionRequestOptions, cred?: CredentialTuple): Promise<{ data: any, status: number }> {
        return this.op(HTTP2_METHOD_DELETE, path, undefined, undefined, { ...opts, endStream: true }, cred)
    }

    /**
     * Execute a HTTP2 POST operation
     * @param path relative path of the endpoint to consume
     * @param body body content to be send
     * @param opts options for the HTTP2 request
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    post(path: string, body: any, contentType = 'application/json', opts?: http2.ClientSessionRequestOptions, cred?: CredentialTuple): Promise<{ data: any, status: number }> {
        return this.op(HTTP2_METHOD_POST, path, body, contentType, { ...opts, endStream: false }, cred)
    }

    /**
     * Execute a HTTP2 PUT operation
     * @param path relative path of the endpoint to consume
     * @param body body content to be send
     * @param opts options for the HTTP2 request
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    put(path: string, body: any, contentType = 'application/json', opts?: http2.ClientSessionRequestOptions, cred?: CredentialTuple): Promise<{ data: any, status: number }> {
        return this.op(HTTP2_METHOD_PUT, path, body, contentType, { ...opts, endStream: false }, cred)
    }
}

/**
 * Convenience class to rety operations that could fail. The type `<P>`
 * describes the class type that would be thrown (if needed)
 */
export class ErrorTools<P extends Error> {
    private errClass: new (errorType: keyof typeof ErrorTypes, ...params: any[]) => P

    /**
     * Builds an `ErrorTools` object
     * @param errClass error class constructor that should be used if something
     * needs to be thrown
     */
    constructor(errClass: new (errorType: keyof typeof ErrorTypes, ...params: any[]) => P) {
        this.errClass = errClass
    }

    /**
     * Attempt an operation that returns an object of type `<T>` and that
     * consumes arguments of type `...<U>[]`
     * @param errorType The type of the error that will be thrown in case of failure
     * @param op function to call
     * @param params arguments to pass to the previous function
     * @returns the response provided by the function
     */
    tryOp<T, U extends any[]>(errorType: keyof typeof ErrorTypes, op: ((...params: U) => T), ...params: U): T {
        try {
            return op(...params)
        } catch (e) {
            throw new this.errClass(errorType, e)
        }
    }

    /**
     * Attempt an async operation that returns an object of type `<T>` and that
     * consumes arguments of type `...<U>[]`
     * @param errorType The type of the error that will be thrown in case of failure
     * @param op function to call
     * @param params arguments to pass to the previous function
     * @returns a promise with the response provided by the function
     */
    async tryAsyncOp<T, U extends any[]>(errorType: keyof typeof ErrorTypes, op: ((...params: U) => Promise<T>), ...params: U): Promise<T> {
        try {
            return await op(...params)
        } catch (e) {
            throw new this.errClass(errorType, e)
        }
    }

    /**
     * Attempt a HTTP2 POST operation
     * @param errorType The type of the error that will be thrown in case of failure
     * @param client `Http2Fetch` object to leverage for this operation
     * @param path relative path of the endpoint to consume
     * @param body body content to be send
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    async tryPost(errorType: keyof typeof ErrorTypes, client: Http2Fetch, path: string, body: any, cred?: CredentialTuple): Promise<{ data: any, status: number }> {
        try {
            return await client.post(path, body, undefined, undefined, cred)
        } catch (e) {
            throw new this.errClass(errorType, e)
        }
    }

    /**
     * Attempt a HTTP2 PUT operation
     * @param errorType The type of the error that will be thrown in case of failure
     * @param client `Http2Fetch` object to leverage for this operation
     * @param path relative path of the endpoint to consume
     * @param body body content to be send
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    async tryPut(errorType: keyof typeof ErrorTypes, client: Http2Fetch, path: string, body: any, cred?: CredentialTuple): Promise<{ data: any, status: number }> {
        try {
            return await client.put(path, body, undefined, undefined, cred)
        } catch (e) {
            throw new this.errClass(errorType, e)
        }
    }

    /**
     * Attempt a HTTP2 GET operation
     * @param errorType The type of the error that will be thrown in case of failure
     * @param client `Http2Fetch` object to leverage for this operation
     * @param path relative path of the endpoint to consume
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    async tryGet(errorType: keyof typeof ErrorTypes, client: Http2Fetch, path: string, cred?: CredentialTuple): Promise<{ data: any, status: number }> {
        try {
            return await client.get(path, undefined, cred)
        } catch (e) {
            throw new this.errClass(errorType, e)
        }
    }

    /**
     * Attempt a HTTP2 DELETE operation
     * @param errorType The type of the error that will be thrown in case of failure
     * @param client `Http2Fetch` object to leverage for this operation
     * @param path relative path of the endpoint to consume
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    async tryDelete(errorType: keyof typeof ErrorTypes, client: Http2Fetch, path: string, cred?: CredentialTuple): Promise<{ data: any, status: number }> {
        try {
            return await client.delete(path, undefined, cred)
        } catch (e) {
            throw new this.errClass(errorType, e)
        }
    }

    /**
     * Generic retrier method that attemps to execute a function that returns a
     * response of type `<O>` provided an arrays of arguments of type `<T>`
     * @param errorType The type of the error that will be thrown in case of failure
     * @param n amount of times to attempt the operation (defaults to 3)
     * @param delay amounts of milliseconds to delay between attempts (defaults
     * to 100)
     * @param op function to be called
     * @param params arguments to be passed to the previous function
     * @returns a Promise with the result of the called function
     */
    async retrier<T, O>(errorType: keyof typeof ErrorTypes, n = 3, delay = 100, op: (...args: T[]) => Promise<O>, ...params: T[]): Promise<O> {
        let a = n
        let lastError: Error | undefined = undefined
        while (a > 0) {
            try {
                return await op(...params)
            } catch (e) {
                commonLogger(logLevel.INFO, `retier(): Failed attempt ${a}`)
                lastError = e
            }
            await new Promise((resolve) => {
                setTimeout(resolve, delay)
            })
            a--
        }
        throw (lastError) ? new this.errClass(errorType, lastError) : new this.errClass(errorType, 'reties exhausted')
    }
}
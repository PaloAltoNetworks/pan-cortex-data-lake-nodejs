"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const http2 = require("http2");
const commonlogger_1 = require("./commonlogger");
const sdkError_1 = require("./sdkError");
const constants_1 = require("./constants");
const { HTTP2_METHOD_GET, HTTP2_METHOD_DELETE, HTTP2_METHOD_POST, HTTP2_METHOD_PUT, HTTP2_HEADER_PATH, HTTP2_HEADER_METHOD, HTTP2_HEADER_STATUS, HTTP2_HEADER_AUTHORIZATION, HTTP2_HEADER_CONTENT_TYPE, HTTP2_HEADER_CONTENT_LENGTH } = http2.constants;
const { APIEPMAP } = constants_1.cortexConstants;
let seqno = Math.floor(Math.random() * 10000);
/**
 * Error subclass that allows the developer get insights on reasons for a HTTP2 error
 */
class Http2FetchError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
    }
}
exports.Http2FetchError = Http2FetchError;
/**
 * Class that implements a HTTP2 fetch object
 */
class Http2Fetch {
    /**
     * Instantiates a new `Http2Fetch` object from provided configuration
     * options. You must provide, at least, `cortexBaseFqdn` or `cortexDefCredentials`
     * @param opts configuration options for this object
     * @returns an instantiated `Http2Fetch` object
     */
    constructor(opts) {
        if (!(opts && (opts.cortexDefCredentials || opts.cortexBaseFqdn))) {
            commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Neither 'cortexBaseFqdn' nor 'cortexDefCredentials' was provided. Will default to '${APIEPMAP['americas']}'`);
        }
        this.opts = opts;
        this.defaultCred = opts && opts.cortexDefCredentials && { cred: opts.cortexDefCredentials, entrypoint: opts.cortexDefCredentials.getEntryPoint(), dlid: "" };
        this.defaultEntrypoint = opts && opts.cortexBaseFqdn || APIEPMAP['americas'];
        this.sessions = {};
    }
    async init(c) {
        await this.refreshSessions(c);
    }
    async refreshSessions(c) {
        if (c) {
            const targetFqdn = c && c.entrypoint;
            if (!(this.sessions[targetFqdn])) {
                this.sessions[targetFqdn] = {
                    authHeader: {}
                };
            }
            await this.lazyUpdateHeaders(c);
            return this.lazyInit(targetFqdn);
        }
        if (this.defaultCred) {
            const targetFqdn = this.defaultCred.entrypoint;
            if (!(this.sessions[targetFqdn])) {
                this.sessions[targetFqdn] = {
                    authHeader: {}
                };
            }
            await this.lazyUpdateHeaders();
            return this.lazyInit(targetFqdn);
        }
        return this.lazyInit(this.defaultEntrypoint);
    }
    lazyInit(targetFqdn) {
        const targetSession = this.sessions[targetFqdn] && this.sessions[targetFqdn].session;
        if (targetSession == undefined || targetSession.closed || targetSession.destroyed) {
            return new Promise((res, rej) => {
                const h3session = http2.connect(`https://${targetFqdn}:443`, this.opts);
                h3session.on('connect', (sess) => {
                    commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Created new HTTP2 session to ${targetFqdn}`);
                    if (this.sessions[targetFqdn]) {
                        this.sessions[targetFqdn].session = sess;
                    }
                    else {
                        this.sessions[targetFqdn] = {
                            session: sess,
                            authHeader: {}
                        };
                    }
                    res(sess);
                });
                h3session.on('error', rej);
            });
        }
        return Promise.resolve(targetSession);
    }
    async lazyUpdateHeaders(c) {
        if (c) {
            let authHeader = this.sessions[c.entrypoint].authHeader[c.dlid];
            if (!authHeader) {
                authHeader = 'Bearer ' + await c.cred.getToken(true);
                if (this.sessions[c.entrypoint]) {
                    this.sessions[c.entrypoint].authHeader[c.dlid] = authHeader;
                }
                else {
                    this.sessions[c.entrypoint] = {
                        authHeader: { [c.dlid]: authHeader }
                    };
                }
                commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `initial autorization header for data lake id ${c.dlid}`);
                return;
            }
            const accessToken = await c.cred.getToken();
            if (accessToken) {
                authHeader = 'Bearer ' + accessToken;
                if (this.sessions[c.entrypoint]) {
                    this.sessions[c.entrypoint].authHeader[c.dlid] = authHeader;
                }
                else {
                    this.sessions[c.entrypoint] = {
                        authHeader: { [c.dlid]: authHeader }
                    };
                }
                commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `updated autorization header for data lake id ${c.dlid}`);
            }
            return;
        }
        if (this.defaultCred) {
            const targetFqdn = this.defaultCred.entrypoint;
            let authHeader = this.sessions[targetFqdn].defaultAuthHeader;
            if (!authHeader) {
                authHeader = 'Bearer ' + await this.defaultCred.cred.getToken(true);
                if (this.sessions[targetFqdn]) {
                    this.sessions[targetFqdn].defaultAuthHeader = authHeader;
                }
                else {
                    this.sessions[targetFqdn] = {
                        defaultAuthHeader: authHeader,
                        authHeader: {}
                    };
                }
                commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'initial autorization header for default data lake');
                return;
            }
            const accessToken = await this.defaultCred.cred.getToken();
            if (accessToken) {
                authHeader = 'Bearer ' + accessToken;
                if (this.sessions[targetFqdn]) {
                    this.sessions[targetFqdn].defaultAuthHeader = authHeader;
                }
                else {
                    this.sessions[targetFqdn] = {
                        defaultAuthHeader: authHeader,
                        authHeader: {}
                    };
                }
                commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'updated autorization header for default data lake');
            }
            return;
        }
        throw new sdkError_1.SdkError('ConfigError', 'bug: unexpected call to updateHeaders() without credentials (or default one)');
    }
    /**
     * Attemps to close the underlying session (if any)
     */
    async close(entryPoint) {
        if (entryPoint) {
            const targetSession = this.sessions[entryPoint].session;
            if (targetSession) {
                await new Promise((res, rej) => {
                    targetSession.close(res);
                });
                delete this.sessions[entryPoint];
            }
            return;
        }
        let closePromises = [];
        for (const targetSession of Object.values(this.sessions).map(x => x.session))
            if (targetSession)
                closePromises.push(new Promise((res, rej) => {
                    targetSession.close(res);
                }));
        await Promise.all(closePromises);
        this.sessions = {};
    }
    async op(method, path, body, contentType, opts, cred) {
        const targetSession = await this.refreshSessions(cred);
        let headers = {
            [HTTP2_HEADER_METHOD]: method,
            [HTTP2_HEADER_PATH]: path,
        };
        if (cred) {
            headers[HTTP2_HEADER_AUTHORIZATION] = this.sessions[cred.entrypoint].authHeader[cred.dlid];
        }
        else if (this.defaultCred) {
            headers[HTTP2_HEADER_AUTHORIZATION] = this.sessions[this.defaultCred.entrypoint].defaultAuthHeader;
        }
        let writeBuffer;
        if (body !== undefined) {
            writeBuffer = Buffer.from(JSON.stringify(body));
            headers[HTTP2_HEADER_CONTENT_TYPE] = contentType;
            headers[HTTP2_HEADER_CONTENT_LENGTH] = writeBuffer.length;
        }
        if (method == HTTP2_METHOD_GET)
            opts = Object.assign({}, opts, { endStream: true });
        commonlogger_1.commonLogger(commonlogger_1.logLevel.DEBUG, `[${++seqno}] http2 request operation. Method ${method}, Path: ${path}`);
        Object.entries(headers).map(x => {
            if (x[0] == HTTP2_HEADER_AUTHORIZATION)
                return [x[0], x[1].slice(0, 12) + "..." + x[1].slice(-4)];
            else
                return x;
        }).forEach(x => {
            commonlogger_1.commonLogger(commonlogger_1.logLevel.DEBUG, `[${seqno}] http2 request header '${x[0]}: ${x[1]}'`);
        });
        const stream = targetSession.request(headers, opts);
        /*
        stream.on('ready', (...e) => console.log("READY", e))
        stream.on('aborted', (...e) => console.log("ABORTED", e))
        stream.on('close', (...e) => console.log("CLOSE", e))
        stream.on('frameError', (...e) => console.log("FRAMEERROR", e))
        stream.on('timeout', (...e) => console.log("TIMEOUT", e))
        */
        let status;
        let responseContentType;
        stream.on('response', headers => {
            commonlogger_1.commonLogger(commonlogger_1.logLevel.DEBUG, `[${seqno}] Response headers: ${JSON.stringify(headers)}`);
            status = Number.parseFloat(headers[HTTP2_HEADER_STATUS]);
            responseContentType = headers[HTTP2_HEADER_CONTENT_TYPE];
        });
        let writePromise = (body === undefined) ? Promise.resolve() : new Promise((res, rej) => {
            try {
                stream.end(writeBuffer, () => {
                    commonlogger_1.commonLogger(commonlogger_1.logLevel.DEBUG, `[${seqno}] http2 payload write: ${writeBuffer.toString()}`);
                    res();
                });
            }
            catch (e) {
                rej(e);
            }
        });
        let readPromise = new Promise((res, rej) => {
            let data = '';
            stream.on('data', chunk => data += chunk);
            stream.on('end', () => {
                if (data.length == 0) {
                    commonlogger_1.commonLogger(commonlogger_1.logLevel.DEBUG, `[${seqno}] http2 read: null`);
                    return res();
                }
                commonlogger_1.commonLogger(commonlogger_1.logLevel.DEBUG, `[${seqno}] http2 read: ${data.length < 200 && data || data.slice(0, 198) + " ..."}`);
                if (responseContentType && typeof responseContentType == 'string' && responseContentType == 'application/json') {
                    return res(JSON.parse(data));
                }
                return res(data);
            });
            stream.on('error', e => {
                rej(e);
            });
        });
        return new Promise((res, rej) => Promise.all([readPromise, writePromise]).then(([x]) => {
            if (isNaN(status) || status >= 400) {
                commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Non-2xx/3xx Status Code. status: ${status}, data: ${JSON.stringify(x)}`);
                rej(new Http2FetchError('Non-2xx/3xx Status Code', status, x));
            }
            else {
                res({ data: x, status: status });
            }
        }, rej));
    }
    /**
     * Execute a HTTP2 GET operation
     * @param path relative path of the endpoint to consume
     * @param opts options for the HTTP2 request
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    get(path, opts, cred) {
        return this.op(HTTP2_METHOD_GET, path, undefined, undefined, opts, cred);
    }
    /**
     * Execute a HTTP2 DELETE operation
     * @param path relative path of the endpoint to consume
     * @param opts options for the HTTP2 request
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    delete(path, opts, cred) {
        return this.op(HTTP2_METHOD_DELETE, path, undefined, undefined, opts, cred);
    }
    /**
     * Execute a HTTP2 POST operation
     * @param path relative path of the endpoint to consume
     * @param body body content to be send
     * @param opts options for the HTTP2 request
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    post(path, body, contentType = 'application/json', opts, cred) {
        return this.op(HTTP2_METHOD_POST, path, body, contentType, opts, cred);
    }
    /**
     * Execute a HTTP2 PUT operation
     * @param path relative path of the endpoint to consume
     * @param body body content to be send
     * @param opts options for the HTTP2 request
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    put(path, body, contentType = 'application/json', opts, cred) {
        return this.op(HTTP2_METHOD_PUT, path, body, contentType, opts, cred);
    }
}
exports.Http2Fetch = Http2Fetch;
/**
 * Convenience class to rety operations that could fail. The type `<P>`
 * describes the class type that would be thrown (if needed)
 */
class ErrorTools {
    /**
     * Builds an `ErrorTools` object
     * @param errClass error class constructor that should be used if something
     * needs to be thrown
     */
    constructor(errClass) {
        this.errClass = errClass;
    }
    /**
     * Attempt an operation that returns an object of type `<T>` and that
     * consumes arguments of type `...<U>[]`
     * @param errorType The type of the error that will be thrown in case of failure
     * @param op function to call
     * @param params arguments to pass to the previous function
     * @returns the response provided by the function
     */
    tryOp(errorType, op, ...params) {
        try {
            return op(...params);
        }
        catch (e) {
            throw new this.errClass(errorType, e);
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
    async tryAsyncOp(errorType, op, ...params) {
        try {
            return await op(...params);
        }
        catch (e) {
            throw new this.errClass(errorType, e);
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
    async tryPost(errorType, client, path, body, cred) {
        try {
            return await client.post(path, body, undefined, undefined, cred);
        }
        catch (e) {
            throw new this.errClass(errorType, e);
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
    async tryPut(errorType, client, path, body, cred) {
        try {
            return await client.put(path, body, undefined, undefined, cred);
        }
        catch (e) {
            throw new this.errClass(errorType, e);
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
    async tryGet(errorType, client, path, cred) {
        try {
            return await client.get(path, undefined, cred);
        }
        catch (e) {
            throw new this.errClass(errorType, e);
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
    async tryDelete(errorType, client, path, cred) {
        try {
            return await client.delete(path, undefined, cred);
        }
        catch (e) {
            throw new this.errClass(errorType, e);
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
    async retrier(errorType, n = 3, delay = 100, op, ...params) {
        let a = n;
        let lastError = undefined;
        while (a > 0) {
            try {
                return await op(...params);
            }
            catch (e) {
                commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `retier(): Failed attempt ${a}`);
                lastError = e;
            }
            await new Promise((resolve) => {
                setTimeout(resolve, delay);
            });
            a--;
        }
        throw (lastError) ? new this.errClass(errorType, lastError) : new this.errClass(errorType, 'reties exhausted');
    }
}
exports.ErrorTools = ErrorTools;

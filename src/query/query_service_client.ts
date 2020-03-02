// Copyright 2015-2020 Palo Alto Networks, Inc
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

import { QueryService } from './query_service'
import { createHash } from 'crypto'
import { Readable, ReadableOptions } from 'stream';
import { QueryServiceClientError } from './query_service_client_error';
import { Http2FetchOpts, Http2Fetch, CredentialTuple } from '../http2client';
import { GetJobResultsOpts, QueryResultResp, QueryJobResp, Query, QueryJobDetail } from './query_service_models';

const MAX_RETRIES = 10
const DEFAULT_DELAY = 200
const DEFAULT_PAGE_SIZE = 400

let initJobCount = Date.now()

function uuid(): string {
    let d = createHash('sha1').update(initJobCount.toString()).digest('hex')
    initJobCount++
    return [0, 6, 12, 18].map(x => d.substr(x, 6)).join('-')
}

class QueryWorker {
    private sqlCommand: string
    private getJobResults: (jobId: String, opts?: GetJobResultsOpts | undefined, cred?: CredentialTuple | undefined) => Promise<QueryResultResp>
    private createJob: (body: Query, cred?: CredentialTuple | undefined) => Promise<QueryJobResp>
    private getJobStatus: (jobId: string, cred?: CredentialTuple | undefined) => Promise<QueryJobDetail>
    deleteJob: (jobId: string, cred?: CredentialTuple | undefined) => Promise<void>
    jobId = null as string | null
    qsc: QueryServiceClient
    cred?: CredentialTuple
    pageCursor = null as string | null
    results = null as any[] | null

    constructor(sqlCommand: string, qsc: QueryServiceClient, cred?: CredentialTuple) {
        this.sqlCommand = sqlCommand
        this.qsc = qsc
        this.getJobResults = qsc.getJobResults.bind(qsc)
        this.createJob = qsc.createJob.bind(qsc)
        this.getJobStatus = qsc.getJobStatus.bind(qsc)
        this.deleteJob = qsc.deleteJob.bind(qsc)
        this.cred = cred
    }

    async loadPage(): Promise<void> {
        if (this.jobId == null) throw new QueryServiceClientError('<undefined>', "can't load a page. lazyInit() failed to set the structure.")
        const results = await this.getJobResults(
            this.jobId,
            { resultFormat: 'valuesDictionary', pageSize: this.qsc.pageSize, pageCursor: this.pageCursor },
            this.cred)
        this.pageCursor = results.page.pageCursor
        this.results = results.page.result.data
    }

    async lazyInit(): Promise<void> {
        if (this.jobId === null) {
            this.jobId = (await this.createJob(
                { jobId: uuid(), params: { query: this.sqlCommand } },
                this.cred)).jobId
            let { state } = await this.getJobStatus(this.jobId, this.cred)
            let attempts = 0
            while ((state == 'PENDING' || state == 'RUNNING') && attempts++ < this.qsc.retries) {
                state = await new Promise((res, rej) => setTimeout(async () => {
                    try {
                        res((await this.getJobStatus(this.jobId!, this.cred)).state)
                    } catch (e) {
                        rej(e)
                    }
                }, this.qsc.delay))
            }
            if (attempts >= this.qsc.retries) throw new QueryServiceClientError(this.jobId, `JobId ${this.jobId} still in status ${state} after ${attempts} attempts`)
            if (state != 'DONE') throw new QueryServiceClientError(this.jobId, `JobId ${this.jobId} failed with status ${state}`)
            await this.loadPage()
        }
    }
}

class QueryIterator implements AsyncIterableIterator<any> {
    private qw: QueryWorker
    cred?: CredentialTuple

    constructor(sqlCommand: string, qsc: QueryServiceClient, cred?: CredentialTuple) {
        this.qw = new QueryWorker(sqlCommand, qsc, cred)
        this.cred = cred
    }

    [Symbol.asyncIterator](): AsyncIterableIterator<any> {
        return this
    }

    async next(): Promise<IteratorResult<any>> {
        try {
            await this.qw.lazyInit()
        } catch (e) {
            if (this.qw.qsc.autoClose) await this.qw.qsc.close()
            throw e
        }
        if (this.qw.results === null && this.qw.pageCursor === null) {
            await this.qw.deleteJob(this.qw.jobId!, this.cred)
            if (this.qw.qsc.autoClose) await this.qw.qsc.close()
            return { value: null, done: true }
        }
        let value = this.qw.results!.slice()
        this.qw.results = null
        if (!(this.qw.pageCursor === null)) {
            await this.qw.loadPage()
        }
        return { value: value, done: false }
    }

    async return(): Promise<IteratorResult<any>> {
        await this.qw.deleteJob(this.qw.jobId!, this.cred)
        if (this.qw.qsc.autoClose) await this.qw.qsc.close()
        return { value: null, done: true }
    }
}

enum readableStates {
    'READY',
    'LOADING',
    'CLOSING',
    'CLOSED'
}

class QueryStream extends Readable {
    private qw: QueryWorker
    private state = readableStates.READY
    private cred: CredentialTuple | undefined

    private pusher = async () => {
        if (this.qw.pageCursor === null) {
            this.state = readableStates.CLOSING
            return this.push(this.qw.results)
        }
        const chunck = this.qw.results!.slice()
        this.state = readableStates.LOADING
        await this.qw.loadPage()
        if (this.push(chunck)) process.nextTick(this.pusher)
        else this.state = readableStates.READY
    }

    constructor(sqlCommand: string, qsc: QueryServiceClient, opts?: ReadableOptions, cred?: CredentialTuple) {
        super({ ...opts, objectMode: true, autoDestroy: true })
        this.cred = cred
        this.qw = new QueryWorker(sqlCommand, qsc, cred)
    }

    _read(): void {
        this.qw.lazyInit().then(() => {
            switch (this.state) {
                case readableStates.READY:
                    process.nextTick(this.pusher)
                    break
                case readableStates.CLOSING:
                    this.state = readableStates.CLOSED
                    this.push(null)
            }
        }).catch(e => process.nextTick(() => this.emit('error', e)))
    }

    _destroy(error: Error | null, callback: (error?: Error | null) => void): void {
        this.qw.deleteJob(this.qw.jobId!, this.cred).
            then(() => callback(null), e => callback(e)).
            finally(async () => {
                if (this.qw.qsc.autoClose) await this.qw.qsc.close()
            })
    }
}

/**
 * Configuration options for the QueryServiceClient object
 */
export interface QueryServiceClientOptions {
    /**
     * Max amount of response items in each page (default: 400)
     */
    pageSize?: number,
    /**
     * Milliseconds to wait before attempting the same call again (default: 200)
     */
    delay?: number,
    /**
     * Amount of retries of the same call (default: 10)
     */
    retries?: number,
    /**
     * By default the iterator or stream will close the underlying HTTP2 session
     * at the end. Switch this flag to false to revert this behaviour. You might
     * want to do so when sharing the same underlying HTTP2 object amongs many clients.
     */
    autoClose?: boolean
    /**
     * Default `Credentials` object to use by this object's methods
     */
    cred?: CredentialTuple
}

/**
 * `QueryService` subclass that provides high-level interfaces to consume Cortex
 * Data Lake queries.
 */
export class QueryServiceClient extends QueryService {
    pageSize: number
    delay: number
    retries: number
    autoClose: boolean

    /**
     * Use the constructor if you want to create a new `QueryService` object
     * sharing an existing `HttpdFetch` object with other objects.
     * @param client `Http2Fetch` object that will be used by the new instance
     * @param cred optional `Credentials` object that will override any
     * operation requiring the `provided Http2Fetch`object
     */
    constructor(client: Http2Fetch, ops?: QueryServiceClientOptions) {
        super(client, ops && ops.cred)
        this.pageSize = ops && ops.pageSize || DEFAULT_PAGE_SIZE
        this.delay = ops && ops.delay || DEFAULT_DELAY
        this.retries = ops && ops.retries || MAX_RETRIES
        this.autoClose = (ops && typeof ops.autoClose == 'boolean') ? ops.autoClose : true
    }

    static factory(opts?: Http2FetchOpts & QueryServiceClientOptions): QueryServiceClient {
        return new QueryServiceClient(new Http2Fetch(opts), opts)
    }

    /**
     * Leverages ES2018 async iterator feature to return a way to iterate a
     * Cortex Data Lake query response
     * @param sqlCommand SQL query to be executed
     * @param cred optional `Credentials` object that will override default
     * credentials used either in the underlying `QueryService` or `Http2Fetch` objects.
     * @returns AsyncIterableIterator object to navigate the query results
     */
    iterator(sqlCommand: string, cred?: CredentialTuple): AsyncIterableIterator<any[]> {
        return new QueryIterator(sqlCommand, this, cred)
    }

    /**
     * Use this method to consume a Cortex Data Lake query reseult set using the
     * NodeJS's Stream.Readable interface
     * @param sqlCommand SQL query to be executed
     * @param cred optional `Credentials` object that will override default
     * credentials used either in the underlying `QueryService` or `Http2Fetch` objects.
     * @returns Stream.Readable object to navigate the query results
     */
    stream(sqlCommand: string, opts?: ReadableOptions, cred?: CredentialTuple): NodeJS.ReadableStream {
        return new QueryStream(sqlCommand, this, opts, cred)
    }
}

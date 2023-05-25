"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryServiceClient = void 0;
const query_service_1 = require("./query_service");
const crypto_1 = require("crypto");
const stream_1 = require("stream");
const query_service_client_error_1 = require("./query_service_client_error");
const http2client_1 = require("../http2client");
const MAX_RETRIES = 10;
const DEFAULT_DELAY = 200;
const DEFAULT_PAGE_SIZE = 400;
let initJobCount = Date.now();
function uuid() {
    let d = (0, crypto_1.createHash)('sha1').update(initJobCount.toString()).digest('hex');
    initJobCount++;
    return [0, 6, 12, 18].map(x => d.substr(x, 6)).join('-');
}
class QueryWorker {
    constructor(sqlCommand, qsc, cred) {
        this.jobId = null;
        this.pageCursor = null;
        this.results = null;
        this.sqlCommand = sqlCommand;
        this.qsc = qsc;
        this.getJobResults = qsc.getJobResults.bind(qsc);
        this.createJob = qsc.createJob.bind(qsc);
        this.getJobStatus = qsc.getJobStatus.bind(qsc);
        this.deleteJob = qsc.deleteJob.bind(qsc);
        this.cred = cred;
    }
    async loadPage() {
        if (this.jobId == null)
            throw new query_service_client_error_1.QueryServiceClientError('<undefined>', "can't load a page. lazyInit() failed to set the structure.");
        const results = await this.getJobResults(this.jobId, { resultFormat: 'valuesDictionary', pageSize: this.qsc.pageSize, pageCursor: this.pageCursor }, this.cred);
        this.pageCursor = results.page.pageCursor;
        this.results = results.page.result.data;
    }
    async lazyInit() {
        if (this.jobId === null) {
            this.jobId = (await this.createJob({ jobId: uuid(), params: { query: this.sqlCommand } }, this.cred)).jobId;
            let jobDetail = await this.getJobStatus(this.jobId, this.cred);
            let state = jobDetail.state;
            let attempts = 0;
            while ((state == 'PENDING' || state == 'RUNNING') && attempts++ < this.qsc.retries) {
                state = await new Promise((res, rej) => setTimeout(async () => {
                    try {
                        jobDetail = await this.getJobStatus(this.jobId, this.cred);
                        res(jobDetail.state);
                    }
                    catch (e) {
                        rej(e);
                    }
                }, this.qsc.delay));
            }
            if (attempts >= this.qsc.retries)
                throw new query_service_client_error_1.QueryServiceClientError(this.jobId, `JobId ${this.jobId} still in status ${state} after ${attempts} attempts`);
            if (state != 'DONE')
                throw query_service_client_error_1.QueryServiceClientError.fromQueryJobDetails(jobDetail);
            await this.loadPage();
        }
    }
}
class QueryIterator {
    constructor(sqlCommand, qsc, cred) {
        this.qw = new QueryWorker(sqlCommand, qsc, cred);
        this.cred = cred;
    }
    [Symbol.asyncIterator]() {
        return this;
    }
    async next() {
        try {
            await this.qw.lazyInit();
        }
        catch (e) {
            if (this.qw.qsc.autoClose)
                await this.qw.qsc.close();
            throw e;
        }
        if (this.qw.results === null && this.qw.pageCursor === null) {
            await this.qw.deleteJob(this.qw.jobId, this.cred);
            if (this.qw.qsc.autoClose)
                await this.qw.qsc.close();
            return { value: null, done: true };
        }
        let value = this.qw.results.slice();
        this.qw.results = null;
        if (!(this.qw.pageCursor === null)) {
            await this.qw.loadPage();
        }
        return { value: value, done: false };
    }
    async return() {
        await this.qw.deleteJob(this.qw.jobId, this.cred);
        if (this.qw.qsc.autoClose)
            await this.qw.qsc.close();
        return { value: null, done: true };
    }
}
var readableStates;
(function (readableStates) {
    readableStates[readableStates["READY"] = 0] = "READY";
    readableStates[readableStates["LOADING"] = 1] = "LOADING";
    readableStates[readableStates["CLOSING"] = 2] = "CLOSING";
    readableStates[readableStates["CLOSED"] = 3] = "CLOSED";
})(readableStates || (readableStates = {}));
class QueryStream extends stream_1.Readable {
    constructor(sqlCommand, qsc, opts, cred) {
        super({ ...opts, objectMode: true, autoDestroy: true });
        this.state = readableStates.READY;
        this.pusher = async () => {
            if (this.qw.pageCursor === null) {
                this.state = readableStates.CLOSING;
                return this.push(this.qw.results);
            }
            const chunck = this.qw.results.slice();
            this.state = readableStates.LOADING;
            await this.qw.loadPage();
            if (this.push(chunck))
                process.nextTick(this.pusher);
            else
                this.state = readableStates.READY;
        };
        this.cred = cred;
        this.qw = new QueryWorker(sqlCommand, qsc, cred);
    }
    _read() {
        this.qw.lazyInit().then(() => {
            switch (this.state) {
                case readableStates.READY:
                    process.nextTick(this.pusher);
                    break;
                case readableStates.CLOSING:
                    this.state = readableStates.CLOSED;
                    this.push(null);
            }
        }).catch(e => process.nextTick(() => this.emit('error', e)));
    }
    _destroy(error, callback) {
        this.qw.deleteJob(this.qw.jobId, this.cred).
            then(() => callback(null), e => callback(e)).
            finally(async () => {
            if (this.qw.qsc.autoClose)
                await this.qw.qsc.close();
        });
    }
}
/**
 * `QueryService` subclass that provides high-level interfaces to consume Cortex
 * Data Lake queries.
 */
class QueryServiceClient extends query_service_1.QueryService {
    /**
     * Use the constructor if you want to create a new `QueryService` object
     * sharing an existing `HttpdFetch` object with other objects.
     * @param client `Http2Fetch` object that will be used by the new instance
     * @param cred optional `Credentials` object that will override any
     * operation requiring the `provided Http2Fetch`object
     */
    constructor(client, ops) {
        super(client, ops && ops.cred);
        this.pageSize = ops && ops.pageSize || DEFAULT_PAGE_SIZE;
        this.delay = ops && ops.delay || DEFAULT_DELAY;
        this.retries = ops && ops.retries || MAX_RETRIES;
        this.autoClose = (ops && typeof ops.autoClose == 'boolean') ? ops.autoClose : true;
    }
    static factory(opts) {
        return new QueryServiceClient(new http2client_1.Http2Fetch(opts), opts);
    }
    /**
     * Leverages ES2018 async iterator feature to return a way to iterate a
     * Cortex Data Lake query response
     * @param sqlCommand SQL query to be executed
     * @param cred optional `Credentials` object that will override default
     * credentials used either in the underlying `QueryService` or `Http2Fetch` objects.
     * @returns AsyncIterableIterator object to navigate the query results
     */
    iterator(sqlCommand, cred) {
        return new QueryIterator(sqlCommand, this, cred);
    }
    /**
     * Use this method to consume a Cortex Data Lake query reseult set using the
     * NodeJS's Stream.Readable interface
     * @param sqlCommand SQL query to be executed
     * @param cred optional `Credentials` object that will override default
     * credentials used either in the underlying `QueryService` or `Http2Fetch` objects.
     * @returns Stream.Readable object to navigate the query results
     */
    stream(sqlCommand, opts, cred) {
        return new QueryStream(sqlCommand, this, opts, cred);
    }
}
exports.QueryServiceClient = QueryServiceClient;

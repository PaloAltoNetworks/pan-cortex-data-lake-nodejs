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
const http2client_1 = require("../http2client");
const constants_1 = require("../constants");
const querystring_1 = require("querystring");
const query_service_error_1 = require("./query_service_error");
const query_service_models_1 = require("./query_service_models");
const commonlogger_1 = require("../commonlogger");
const { EP_QUERY } = constants_1.cortexConstants;
/**
 * Provides an abstraction of the Cortex Data Lake Query Service API
 */
class QueryService {
    /**
     * Use the constructor if you want to create a new `QueryService` object
     * sharing an existing `HttpdFetch` object with other objects.
     * @param client `Http2Fetch` object that will be used by the new instance
     * @param cred optional `Credentials` object that will override any
     * operation requiring the provided `Http2Fetch` object
     */
    constructor(client, cred) {
        this.client = client;
        this.defCred = cred && { cred: cred, entrypoint: cred.cred.getEntryPoint() };
    }
    static pathQsCombo(path, opts) {
        let returnPath = path;
        if (opts) {
            returnPath += '?' + querystring_1.stringify(opts);
        }
        return returnPath;
    }
    /**
     * Factory method that builds an `Http2Fetch` object and then instantiates a
     * new `QueryService` object on top of it.
     * @param opts parameters for the `Http2Fetch` constructor
     * @returns an instantiated `QueryService` object
     */
    static factory(opts) {
        return new QueryService(new http2client_1.Http2Fetch(opts));
    }
    /**
     * Cortex Data Lake contains log data that is written by various products and apps, such as Palo Alto Networks
     * next-generation firewalls. Use this API to create query jobs that return log data matching your query criteria.
     * You define query criteria using a SQL SELECT statement that you specify as part of the payload for this API.
     * You can obtain query results using the uri contained in this API’s response object.
     *
     * @param body A JSON object that must provide a SQL SELECT statement which is used to identify the log records
     * that you want to retrieve. Optionally, you can also specify a jobId (strongly recommended), and various
     * query parameters which are useful for tuning query performance.
     * @param cred optional credentials object that will override the one used
     * by the `QueryService` or its underlying `Http2Fetch` object
     * @returns the request response
     */
    async createJob(body, cred) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.DEBUG, `createJob(). Payload: ${JSON.stringify(body)}`);
        let { data, status } = await QueryService.errorTools.tryPost('ComsError', this.client, EP_QUERY + '/jobs', body, cred || this.defCred && this.defCred.cred);
        if (status == 201 && query_service_models_1.isQueryJobResp(data)) {
            return data;
        }
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `ParseError: status code ${status} with unparseable response: ${JSON.stringify(data)}`);
        throw new query_service_error_1.QueryServiceError('ParseError', `status code ${status} with unparseable response: ${JSON.stringify(data)}`);
    }
    /**
     * Retrieve a page of query results for the query job identified by {jobId}.
     *
     * @param jobId The ID of the job for which you want to retrieve a page of results.
     * This ID is contained in the jobId response field that is returned when you create the query job.
     * @param opts Request options
     * @param cred optional credentials object that will override the one used
     * by the `QueryService` or its underlying `Http2Fetch` object
     * @returns the request response
     */
    async getJobResults(jobId, opts, cred) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.DEBUG, `getJobResults(). jobId: ${jobId}, options: ${JSON.stringify(opts)}`);
        let { data, status } = await QueryService.errorTools.tryGet('ComsError', this.client, QueryService.pathQsCombo(`${EP_QUERY}/jobResults/${jobId}`, opts), cred || this.defCred && this.defCred.cred);
        if (query_service_models_1.isQueryResultResp(data)) {
            return data;
        }
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `ParseError: status code ${status} with unparseable response: ${JSON.stringify(data)}`);
        throw new query_service_error_1.QueryServiceError('ParseError', `status code ${status} with unparseable response: ${JSON.stringify(data)}`);
    }
    /**
     * Retrieves a list of query jobs that match specified criteria. The retrieved list of jobs is in chronological order,
     * from most recent to oldest.
     * @param opts
     * @param cred optional credentials object that will override the one used
     * by the `QueryService` or its underlying `Http2Fetch` object
     * @returns the request response
     */
    async getJobsList(opts, cred) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.DEBUG, `getJobsList(). options: ${JSON.stringify(opts)}`);
        let { data, status } = await QueryService.errorTools.tryGet('ComsError', this.client, QueryService.pathQsCombo(`${EP_QUERY}/jobs`, opts), cred || this.defCred && this.defCred.cred);
        if (status == 200 && Array.isArray(data) && data.every(query_service_models_1.isQueryJobDetail)) {
            return data;
        }
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `ParseError: status code ${status} with unparseable response: ${JSON.stringify(data)}`);
        throw new query_service_error_1.QueryServiceError('ParseError', `status code ${status} with unparseable response: ${JSON.stringify(data)}`);
    }
    /**
     * Returns detailed information about the query job. This information includes the job’s current state,
     * it’s submission and start times, the estimated amount of work that has been completed, and the original
     * query parameters (SELECT statement, page size, and so forth.)
     *
     * @param jobId ID of the query job for which you want to retrieve job information.
     * @param cred optional credentials object that will override the one used
     * by the `QueryService` or its underlying `Http2Fetch` object
     * @returns the request response
     */
    async getJobStatus(jobId, cred) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.DEBUG, `getJobStatus(). jobId: ${jobId}`);
        let { data, status } = await QueryService.errorTools.tryGet('ComsError', this.client, `${EP_QUERY}/jobs/${jobId}`, cred || this.defCred && this.defCred.cred);
        if (status == 200 && query_service_models_1.isQueryJobDetail(data)) {
            return data;
        }
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `ParseError: status code ${status} with unparseable response: ${JSON.stringify(data)}`);
        throw new query_service_error_1.QueryServiceError('ParseError', `status code ${status} with unparseable response: ${JSON.stringify(data)}`);
    }
    /**
     * Asks the query service to cancel the identified query job. A successful response to this call does
     * not guarantee that the job has been, or will be, canceled.
     * @param jobId ID of the query job that you want to cancel. This ID is contained in the jobId response field that is returned when you create the query job.
     * @param cred optional credentials object that will override the one used
     * by the `QueryService` or its underlying `Http2Fetch` object
     */
    async deleteJob(jobId, cred) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.DEBUG, `deleteJob(). jobId: ${jobId}`);
        let { data, status } = await QueryService.errorTools.tryDelete('ComsError', this.client, `${EP_QUERY}/jobs/${jobId}`, cred || this.defCred && this.defCred.cred);
        if (status == 200) {
            return;
        }
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `ParseError: status code ${status} with unparseable response: ${JSON.stringify(data)}`);
        throw new query_service_error_1.QueryServiceError('ParseError', `status code ${status} with unparseable response: ${JSON.stringify(data)}`);
    }
    /**
     * Closes the underlying `Http2Fetch` client session
     */
    close(entryPoint) {
        return this.client.close(entryPoint || this.defCred && this.defCred.entrypoint);
    }
}
QueryService.errorTools = new http2client_1.ErrorTools(query_service_error_1.QueryServiceError);
exports.QueryService = QueryService;

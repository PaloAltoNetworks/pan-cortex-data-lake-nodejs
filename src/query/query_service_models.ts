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

/**
 * Describes mandatory and optional configuration options to perform a query job
 */
export type QueryParams = {
    /**
     * SQL query that identifies the log records you want this query job to retrieve.
     */
    query: string,
    /**
     * Identifies the SQL query dialect that the query string uses. Defaults to Csql.
     * Currently, only Csql is supported.
     */
    dialect?: string
    properties?: {
        /**
         * Client’s requested priority for this job.
         *
         * - immediate: Run with the highest priority.
         * 
         * - foreground: Run with middle priority.
         *
         * - background: Run with lowest priority.
         *
         * - default: `foreground`
         */
        priority?: 'immediate' | 'foreground' | 'background'
        /**
         * Identifies the maximum number of milliseconds the job can run within Cortex before it completes.
         * If this limit is reached before the job has retrieved its full query set, the job reports a state of Failed.
         * In this case, some query results may be available, but the result set is not guaranteed to be complete.
         *
         * - default: none
         */
        timeoutMs?: number,
        /**
         * Maximum number of milliseconds the request’s HTTP connection remains open waiting for a response.
         * If the requested page cannot be returned in this amount of time, the service closes the connection without returning results.
         * Maximum value is 2000 (2 seconds). If 0, the HTTP connection is closed immediately upon completion of the HTTP request.
         *
         * - default: no wait
         */
        maxWait?: number,
        /**
         * Default number of log records retrieved for page of results.
         * The value specified here identifies the number of records appearing in the response object’s result array.
         * If the page is the last in the result set, this is the maximum number of records that will appear in the result array.
         * This parameter’s maximum value is 100000.
         * 
         * - default: 10000
         */
        defaultPageSize?: number
    }
}

function isQueryParams(obj: any): obj is QueryParams {
    return typeof obj == 'object' &&
        typeof obj.query == 'string' &&
        (obj.dialect === undefined || typeof obj.dialect == 'string') &&
        (obj.properties === undefined || (
            typeof obj.properties == 'object' &&
            (obj.properties.priority === undefined || ['immediate', 'foreground', 'background'].some(x => x == obj.properties.priority)) &&
            (obj.properties.timeoutMs === undefined || typeof obj.properties.timeoutMs == 'number') &&
            (obj.properties.maxWait === undefined || typeof obj.properties.maxWait == 'number') &&
            (obj.properties.defaultPageSize === undefined || typeof obj.properties.defaultPageSize == 'number'))
        )
}

/**
 * Interface that describes a query job
 */
export type Query = {
    /**
     * Identifies the ID that you want the query job to use. This ID must be unique within the service.
     * Maximum length is 1000 characters. May contain any alphanumeric character, and dash (-).
     */
    jobId?: string,
    /**
     * Job configuration options
     */
    params: QueryParams
}

/**
 * Models the response provided by the Query Service
 */
export type QueryJobResp = {
    /**
     * The unique ID assigned to this query job
     */
    jobId: string
    /**
     * URI used to retrieve statistics and other details about the query job.
     */
    uri: string
}

/**
 * Convenience type guard function to check if a object conforms to the
 * `QueryJobResp` interface.
 * @param obj object to be checked
 * @returns true if the interface is satisfied
 */
export function isQueryJobResp(obj: any): obj is QueryJobResp {
    return typeof obj == 'object' &&
        typeof obj.jobId == 'string' &&
        typeof obj.uri == 'string'
}

enum jobState {
    'pending',
    'running',
    'done',
    'failed',
    'timedout',
    'canceled'
}

/**
 * The different states a query job can be
 */
export type JobState = 'PENDING' | 'RUNNING' | 'DONE' | 'FAILED' | 'CANCELLED'

function isJobState(obj: any): obj is JobState {
    return typeof (obj) == 'string' && ['PENDING', 'RUNNING', 'DONE', 'FAILED', 'CANCELLED'].includes(obj)
}

/**
 * Detailed information about a query job
 */
export type QueryJobDetail = {
    /**
     * The unique ID assigned to this query job.
     */
    jobId: string,
    /**
     * Job state. Job is not completed unless the state is Done or Failed. If Pending, no job results are available.
     * 
     * - pending: Job has been submitted but is not yet processing data.
     * - running: Job is actively processing data. Some query pages might be available for retrieval.
     * - done: Job is complete. All job data is ready for retrieval.
     * - failed: Job did not successfully complete.
     * - timedout: Job did not finish in requested time limit.
     * - canceled: Job was terminated because of a cancel request.
     */

    state: JobState,
    /**
     * Timestamp when the query job was submitted to Cortex.
     */
    submitTime: number,
    /**
     * Starting time range for this query. Log records older than this timestamp are not considered for query evaluation.     * 
     */
    startTime?: number,
    /**
     * Ending time range for this query. Log records newer than this timestamp are not considered for query evaluation.
     */
    endTime?: number,
    progress?: {
        /**
         * Identifies the amount of work completed by the job.
         */
        completionPct: number
    },
    params?: QueryParams,
    /**
     * Provides runtime statistics such as resources used, cache hits, data volume processed, and so forth.
     */
    statistics?: {
        runTimeMs?: number,
        cachePct?: number,
        etaMs?: number
    }
}

/**
 * Convenience type guard function to check if a object conforms to the
 * `QueryJobDetail` interface
 * @param obj object to be checked
 * @returns true is the interface is satisfied
 */
export function isQueryJobDetail(obj: any): obj is QueryJobDetail {
    return typeof obj == 'object' &&
        typeof obj.jobId == 'string' &&
        isJobState(obj.state) &&
        typeof obj.submitTime == 'number' &&
        (obj.startTime === undefined || typeof obj.startTime == 'number') &&
        (obj.endTime === undefined || typeof obj.endTime == 'number') &&
        (obj.progress === undefined || typeof obj.progress == 'object' && typeof obj.progress.completionPct == 'number') &&
        (obj.params === undefined || typeof obj.params == 'object' && isQueryParams(obj.params)) &&
        (obj.statistics === undefined || typeof obj.statistics == 'object')
}

/**
 * The different formats a job query result could have
 */
export type ResultFormat = 'valuesArray' | 'valuesDictionary'

/**
 * Model of a query service result response
 */
export type QueryResultResp = {
    /**
     * The unique ID assigned to this query job
     */
    jobId: string,
    /**
     * Job state. Job is not completed unless the state is Done or Failed. If Pending, no job results are
     * available.
     */
    state: JobState,
    /**
     * Determines the format of the result array elements.
     */
    resultFormat: ResultFormat,
    /**
     * Number of log records contained in the result set.
     */
    rowsInJob?: number,
    /**
     * Number of log records contained in the current page.
     */
    rowsInPage?: number
    /**
     * Identifies the schema used by the log records contained in the result set. This field is omitted when the
     * resultFormat query parameter is dictionary.
     */
    schema?: {
        fields: any[]
    }
    page: {
        /**
         * Value used to retrieve the next page in the result set.
         */
        pageCursor: string | null,
        result: {
            /**
             * Array of result log records. If resultFormat is dictionary, each array element is a JSON object
             * where each dictionary key is a log field name. Else, each array element is an array of log field values.
             */
            data: any[]
        }
    }
}

/**
 * Convenienece method to check if an object conforms to the `QueryResultResp` interface
 * @param obj object to be checked
 * @returns true if the interface is satisfied
 */
export function isQueryResultResp(obj: any): obj is QueryResultResp {
    return typeof obj == 'object' &&
        typeof obj.jobId == 'string' &&
        isJobState(obj.state) &&
        typeof obj.resultFormat == 'string' &&
        (obj.rowsInJob === undefined || typeof obj.rowsInJob == 'number') &&
        (obj.rowsInPage === undefined || typeof obj.rowsInPage == 'number') &&
        typeof obj.page == 'object' && (obj.page.pageCursor === null || typeof obj.page.pageCursor == 'string')
}

/**
 * Model of a query service error response
 */
export type QueryApiError = {
    /**
     * Error code. Typically this is the error code seen in the first element of the errors array.
     */
    errorCode?: number,
    /**
     * Textual description of the error.
     */
    message?: string,
    /**
     * Diagnostic context, if any.
     */
    context?: string
}

/**
 * Convenience type guard function to check if an object conforms to the
 * `QueryApiError` interface
 * @param obj the object to be checked
 * @returns true if the interface is satisfied
 */
export function isQueryApiError(obj: any): obj is QueryApiError {
    return typeof obj == 'object' &&
        typeof obj.errorCode == 'number' &&
        typeof obj.message == 'string' &&
        (obj.context === undefined || typeof obj.context == 'string')
}

/**
 * Configuration options for the Get Job Results Query API call
 */
export type GetJobResultsOpts = {
    /**
     * Maximum number of milliseconds you want the HTTP connection to remain open waiting for a response.
     * If the requested page cannot be returned in this amount of time, the service closes the connection without returning
     * results. This parameter’s maximum value is 2000 (2 seconds). If this parameter is 0, the HTTP connection is closed
     * immediately upon completion of the HTTP request. Default value : 0
     */
    maxWait?: number,
    /**
     * Format of the retrieved log records. Log records are returned in the response object’s
     * page.result.result array. Each element of this array is a single log record. This parameter identifies each
     * such record’s format. - *valuesArray*:  Individual records are provided as an array. Each element of this log record
     * array is a log field value. Position is meaningful in this array. Use the result object’s schema.fields array to
     * identify the log field to which any given member of the log record array belongs. - *valuesDictionary* Individual log
     * records are provided as a dictionary, or JSON object. Each such object’s field name is identical to the log record
     * field name.
     */
    resultFormat?: ResultFormat,
    /**
     * Number of log records you want retrieved for this request. The value you specify here identifies
     * the number of records that will appear in the response object’s page.result.result array. If you are retrieving the
     * last page in the job’s result set, this is the maximum number of records that will appear in the page.result.result
     * array.This parameter’s maximum value is 100000. Default value : 10000
     */
    pageSize?: number,
    /**
     * Cursor value to use for fetching this page. Each call to this API contains a response object page.pageCursor field.
     * The value of this field is the cursor value that you use to retrieve the next page.It is an error to use this parameter
     * with the pageNumber and/or offset parameters.
     */
    pageCursor?: string | null,
    /**
     * Page number to fetch. Page numbers are calculated by using the default page size (10000).
     * If this parameter is used, then pageSize is ignored. It is an error to use this parameter with the pageCursor and/or
     * offset parameters
     */
    pageNumber?: number,
    /**
     * Log record number that you want to start this page with, counting from the first log record in the
     * result set. It is an error to use this parameter with the pageCursor and/or pageNumber parameters
     */
    offset?: number
}

/**
 * Configuration options for the Get Jobs List Query API call
 */
export type GetJobsListOpts = {
    tenantId: string,
    /**
     * Lower limit job creation timestamp. Jobs are only listed if they were created after the time identified here.
     * Value must be a Unix epoch timestamp.
     */
    createdAfter?: number,
    /**
     * Maximum number of jobs to list.
     */
    maxJobs?: number,
    /**
     * Return only jobs in the specified state
     */
    state?: keyof typeof jobState
}

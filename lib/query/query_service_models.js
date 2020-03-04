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
function isQueryParams(obj) {
    return typeof obj == 'object' &&
        typeof obj.query == 'string' &&
        (obj.dialect === undefined || typeof obj.dialect == 'string') &&
        (obj.properties === undefined || (typeof obj.properties == 'object' &&
            (obj.properties.priority === undefined || ['immediate', 'foreground', 'background'].some(x => x == obj.properties.priority)) &&
            (obj.properties.timeoutMs === undefined || typeof obj.properties.timeoutMs == 'number') &&
            (obj.properties.maxWait === undefined || typeof obj.properties.maxWait == 'number') &&
            (obj.properties.defaultPageSize === undefined || typeof obj.properties.defaultPageSize == 'number')));
}
/**
 * Convenience type guard function to check if a object conforms to the
 * `QueryJobResp` interface.
 * @param obj object to be checked
 * @returns true if the interface is satisfied
 */
function isQueryJobResp(obj) {
    return typeof obj == 'object' &&
        typeof obj.jobId == 'string' &&
        typeof obj.uri == 'string';
}
exports.isQueryJobResp = isQueryJobResp;
var jobState;
(function (jobState) {
    jobState[jobState["pending"] = 0] = "pending";
    jobState[jobState["running"] = 1] = "running";
    jobState[jobState["done"] = 2] = "done";
    jobState[jobState["failed"] = 3] = "failed";
    jobState[jobState["timedout"] = 4] = "timedout";
    jobState[jobState["canceled"] = 5] = "canceled";
})(jobState || (jobState = {}));
function isJobState(obj) {
    return typeof (obj) == 'string' && ['PENDING', 'RUNNING', 'DONE', 'FAILED', 'CANCELLED'].includes(obj);
}
/**
 * Convenience type guard function to check if a object conforms to the
 * `QueryJobDetail` interface
 * @param obj object to be checked
 * @returns true is the interface is satisfied
 */
function isQueryJobDetail(obj) {
    return typeof obj == 'object' &&
        typeof obj.jobId == 'string' &&
        isJobState(obj.state) &&
        typeof obj.submitTime == 'number' &&
        (obj.startTime === undefined || typeof obj.startTime == 'number') &&
        (obj.endTime === undefined || typeof obj.endTime == 'number') &&
        (obj.progress === undefined || typeof obj.progress == 'object' && typeof obj.progress.completionPct == 'number') &&
        (obj.params === undefined || typeof obj.params == 'object' && isQueryParams(obj.params)) &&
        (obj.statistics === undefined || typeof obj.statistics == 'object') &&
        (obj.errors === undefined || typeof obj.errors == 'object');
}
exports.isQueryJobDetail = isQueryJobDetail;
/**
 * Convenienece method to check if an object conforms to the `QueryResultResp` interface
 * @param obj object to be checked
 * @returns true if the interface is satisfied
 */
function isQueryResultResp(obj) {
    return typeof obj == 'object' &&
        typeof obj.jobId == 'string' &&
        isJobState(obj.state) &&
        typeof obj.resultFormat == 'string' &&
        (obj.rowsInJob === undefined || typeof obj.rowsInJob == 'number') &&
        (obj.rowsInPage === undefined || typeof obj.rowsInPage == 'number') &&
        typeof obj.page == 'object' && (obj.page.pageCursor === null || typeof obj.page.pageCursor == 'string');
}
exports.isQueryResultResp = isQueryResultResp;
/**
 * Convenience type guard function to check if an object conforms to the
 * `QueryApiError` interface
 * @param obj the object to be checked
 * @returns true if the interface is satisfied
 */
function isQueryApiError(obj) {
    return typeof obj == 'object' &&
        typeof obj.errorCode == 'number' &&
        typeof obj.message == 'string' &&
        (obj.context === undefined || typeof obj.context == 'string');
}
exports.isQueryApiError = isQueryApiError;

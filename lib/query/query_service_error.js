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
exports.QueryServiceError = void 0;
const sdkError_1 = require("../sdkError");
const query_service_models_1 = require("./query_service_models");
const commonlogger_1 = require("../commonlogger");
const http2client_1 = require("../http2client");
/**
 * Error subclass provided by `QueryService` objects that allow developer get
 * insights on why the operation could not be completed
 */
class QueryServiceError extends sdkError_1.SdkError {
    constructor(errorType, ...params) {
        super(errorType, ...(params.length > 0 && params[0] instanceof Error) ? [params[0].message] : params);
        this.name = 'query.sdk.cortex';
        this.errors = [];
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, QueryServiceError);
        }
        let procErrors = (errors) => {
            errors.forEach(x => {
                if ((0, query_service_models_1.isQueryApiError)(x)) {
                    this.errors.push(x);
                    (0, commonlogger_1.commonLogger)(commonlogger_1.logLevel.WARNING, `QueryApi errorCode: ${x.errorCode} | message: ${x.message} | context: ${x.context} `);
                }
                else
                    (0, commonlogger_1.commonLogger)(commonlogger_1.logLevel.WARNING, `QueryApi unparseable error: ${JSON.stringify(x)}`);
            });
        };
        if (params.length > 0) {
            let p0 = params[0];
            if (p0 instanceof Error) {
                this.sourceError = p0;
                if (p0 instanceof http2client_1.Http2FetchError) {
                    this.errorType = 'QueryApi';
                    this.status = p0.status;
                    if (Array.isArray(p0.data))
                        procErrors(p0.data);
                    else if (typeof p0.data == 'object') {
                        this.jobId = p0.data.jobId;
                        this.uri = p0.data.uri;
                        if (Array.isArray(p0.data.errors))
                            procErrors(p0.data.errors);
                    }
                }
            }
        }
    }
}
exports.QueryServiceError = QueryServiceError;

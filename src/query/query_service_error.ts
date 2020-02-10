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

import { ErrorTypes, SdkError } from '../sdkError'
import { QueryApiError, isQueryApiError } from './query_service_models'
import { commonLogger, logLevel } from '../commonlogger'
import { Http2FetchError } from '../http2client'

/**
 * Error subclass provided by `QueryService` objects that allow developer get
 * insights on why the operation could not be completed
 */
export class QueryServiceError extends SdkError {
    /**
     * Underlying class that originated the error
     */
    sourceError: Error
    /**
     * http2 status code in the response
     */
    status: number
    /**
     * Array of errors provided by the Cortex API GW
     */
    errors: QueryApiError[]
    /**
     * job identifier
     */
    jobId?: string
    /**
     * The called uri that triggered the error
     */
    uri?: string

    constructor(errorType: keyof typeof ErrorTypes, ...params: any[]) {
        super(errorType, ...(params.length > 0 && params[0] instanceof Error) ? [params[0].message] : params)
        this.name = 'query.sdk.cortex'
        this.errors = []
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, QueryServiceError)
        }

        let procErrors = (errors: QueryApiError[]) => {
            errors.forEach(x => {
                if (isQueryApiError(x)) {
                    this.errors.push(x)
                    commonLogger(logLevel.WARNING, `QueryApi errorCode: ${x.errorCode} | message: ${x.message} | context: ${x.context} `)
                }
                else
                    commonLogger(logLevel.WARNING, `QueryApi unparseable error: ${JSON.stringify(x)}`)
            })
        }

        if (params.length > 0) {
            let p0 = params[0]
            if (p0 instanceof Error) {
                this.sourceError = p0
                if (p0 instanceof Http2FetchError) {
                    this.errorType = 'QueryApi'
                    this.status = p0.status
                    if (Array.isArray(p0.data)) procErrors(p0.data)
                    else if (typeof p0.data == 'object') {
                        this.jobId = p0.data.jobId
                        this.uri = p0.data.uri
                        if (Array.isArray(p0.data.errors)) procErrors(p0.data.errors)
                    }
                }
            }
        }
    }
}
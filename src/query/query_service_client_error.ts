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

import { SdkError } from '../sdkError'
import { JobState, QueryJobDetail } from './query_service_models'

/**
 * Error subclass provided by `QueryServiceClient` objects that allow developer
 * get insights on why the operation could not be completed
 */
export class QueryServiceClientError extends SdkError {
    /**
     * State of the job when the error was thrown
     */
    status: JobState
    /**
     * Job identifier associated to the operation
     */
    jobId: string
    /**
     * Provides additional information in case of error
     */
    errors?: {
        message: string,
        context: string
    }[]

    constructor(jobId: string, ...params: any[]) {
        super('QueryClient', ...(params.length > 0 && params[0] instanceof Error) ? [params[0].message] : params)
        this.name = 'queryclient.sdk.cortex'
        this.jobId = jobId
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, QueryServiceClientError)
        }
    }

    /**
     * Takes a QueryJobDetail object (assuming to be in `FAIL` state) and builds
     * a QueryServiceClientError from its data
     * @param jobDetail object to take data from
     * @returns a new QueryServiceClientError object
     */
    static fromQueryJobDetails(jobDetail: QueryJobDetail): QueryServiceClientError {
        const clientError = new QueryServiceClientError(jobDetail.jobId, `JobId ${jobDetail.jobId} ended with status ${jobDetail.state}`)
        clientError.errors = jobDetail.errors
        return clientError
    }
}
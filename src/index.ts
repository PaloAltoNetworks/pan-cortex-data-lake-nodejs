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

export * from './query'
export { ErrorTypes } from './sdkError'
export { Http2Fetch, CredentialTuple } from './http2client'
export { setLogLevel, logLevel } from './commonlogger'
export { cortexConstants } from './constants'

/**
 * The basic methods expected from an object that provides credentials
 */
export interface Credentials {
    /**
     * Method to retrieve the token data
     * @param force flag to force the response to contain token data even if a
     * refresh operation has not been performed. An undefined response can be
     * used by the consumer to keep using its cached data.
     * @returns credential data either if the `force` flag was set of a refresh
     * operation produced new credential material.
     */
    getToken(force?: boolean): Promise<string | undefined>;
    /**
     * Cortex Data Lake API fqdn (region) this token in valid for
     */
    getEntryPoint(): string;
}

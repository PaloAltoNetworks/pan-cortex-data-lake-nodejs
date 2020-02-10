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

import { SdkError } from "./sdkError"

/**
 * Log levels supported
 */
export enum logLevel {
    DEBUG,
    INFO,
    WARNING,
    ERROR,
    NONE
}
const envLevel = Number.parseInt(process.env['CORTEX_SDK_LOG'] || '', 10)
let currentLogLevel: logLevel = (isNaN(envLevel) && logLevel.INFO) || envLevel
const logFunc = [console.debug, console.info, console.warn, console.error]

/**
 * logs an error object
 * @param error object to be logged
 */
export function commonLogger(error: Error): void
/**
 * logs a message string
 * @param level level of the message
 * @param message the error message
 * @param noPrefix to remove the 'CORTEX_SDK' prefix in the output
 */
export function commonLogger(level: logLevel, message: string, noPrefix?: boolean): void
export function commonLogger(firstArg: Error | logLevel, secondArg?: string, noPrefix?: boolean): void {
    const ts = new Date().toLocaleString("en-us", { hour12: false })
    if (firstArg instanceof Error) {
        if (currentLogLevel <= logLevel.ERROR) {
            if (firstArg instanceof SdkError) {
                console.error(ts, 'CORTEX_SDK error_type: ' + firstArg.errorType)
            }
            console.error(firstArg.stack)
        }
        return
    }
    if (firstArg < currentLogLevel) return
    if (typeof secondArg == 'string') {
        logFunc[firstArg](ts, noPrefix ? '' : 'CORTEX_SDK', secondArg)
    }
}

/**
 * Change the log level of the common logger at runtime
 * @param level 
 */
export function setLogLevel(level: logLevel) {
    currentLogLevel = level
}
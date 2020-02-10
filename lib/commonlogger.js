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
const sdkError_1 = require("./sdkError");
/**
 * Log levels supported
 */
var logLevel;
(function (logLevel) {
    logLevel[logLevel["DEBUG"] = 0] = "DEBUG";
    logLevel[logLevel["INFO"] = 1] = "INFO";
    logLevel[logLevel["WARNING"] = 2] = "WARNING";
    logLevel[logLevel["ERROR"] = 3] = "ERROR";
    logLevel[logLevel["NONE"] = 4] = "NONE";
})(logLevel = exports.logLevel || (exports.logLevel = {}));
const envLevel = Number.parseInt(process.env['CORTEX_SDK_LOG'] || '', 10);
let currentLogLevel = (isNaN(envLevel) && logLevel.INFO) || envLevel;
const logFunc = [console.debug, console.info, console.warn, console.error];
function commonLogger(firstArg, secondArg, noPrefix) {
    const ts = new Date().toLocaleString("en-us", { hour12: false });
    if (firstArg instanceof Error) {
        if (currentLogLevel <= logLevel.ERROR) {
            if (firstArg instanceof sdkError_1.SdkError) {
                console.error(ts, 'CORTEX_SDK error_type: ' + firstArg.errorType);
            }
            console.error(firstArg.stack);
        }
        return;
    }
    if (firstArg < currentLogLevel)
        return;
    if (typeof secondArg == 'string') {
        logFunc[firstArg](ts, noPrefix ? '' : 'CORTEX_SDK', secondArg);
    }
}
exports.commonLogger = commonLogger;
/**
 * Change the log level of the common logger at runtime
 * @param level
 */
function setLogLevel(level) {
    currentLogLevel = level;
}
exports.setLogLevel = setLogLevel;

"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cortexConstants = exports.logLevel = exports.setLogLevel = exports.Http2Fetch = exports.ErrorTypes = void 0;
__exportStar(require("./query"), exports);
var sdkError_1 = require("./sdkError");
Object.defineProperty(exports, "ErrorTypes", { enumerable: true, get: function () { return sdkError_1.ErrorTypes; } });
var http2client_1 = require("./http2client");
Object.defineProperty(exports, "Http2Fetch", { enumerable: true, get: function () { return http2client_1.Http2Fetch; } });
var commonlogger_1 = require("./commonlogger");
Object.defineProperty(exports, "setLogLevel", { enumerable: true, get: function () { return commonlogger_1.setLogLevel; } });
Object.defineProperty(exports, "logLevel", { enumerable: true, get: function () { return commonlogger_1.logLevel; } });
var constants_1 = require("./constants");
Object.defineProperty(exports, "cortexConstants", { enumerable: true, get: function () { return constants_1.cortexConstants; } });

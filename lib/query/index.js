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
exports.QueryServiceClientError = exports.QueryServiceClient = exports.QueryServiceError = exports.QueryService = void 0;
var query_service_1 = require("./query_service");
Object.defineProperty(exports, "QueryService", { enumerable: true, get: function () { return query_service_1.QueryService; } });
var query_service_error_1 = require("./query_service_error");
Object.defineProperty(exports, "QueryServiceError", { enumerable: true, get: function () { return query_service_error_1.QueryServiceError; } });
var query_service_client_1 = require("./query_service_client");
Object.defineProperty(exports, "QueryServiceClient", { enumerable: true, get: function () { return query_service_client_1.QueryServiceClient; } });
var query_service_client_error_1 = require("./query_service_client_error");
Object.defineProperty(exports, "QueryServiceClientError", { enumerable: true, get: function () { return query_service_client_error_1.QueryServiceClientError; } });

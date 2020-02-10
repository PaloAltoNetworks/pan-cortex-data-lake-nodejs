"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdkError_1 = require("../sdkError");
const http2client_1 = require("../http2client");
class SchemaServiceError extends sdkError_1.SdkError {
    constructor(errorType, ...params) {
        super(errorType, ...params);
        this.errors = [];
        this.name = 'schema.sdk.cortex';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, SchemaServiceError);
        }
        if (params.length > 0) {
            let p0 = params[0];
            if (p0 instanceof Error) {
                this.sourceError = p0;
                if (p0 instanceof http2client_1.Http2FetchError) {
                    this.errorType = 'SchemaApi';
                    this.status = p0.status;
                    if (p0.data !== undefined) {
                        ({ path: this.path, timestamp: this.timestamp, schemaId: this.schemaId, version: this.version } = p0.data);
                        if (p0.data.message !== undefined)
                            this.message = p0.data.message;
                        if (Array.isArray(p0.data.errors))
                            p0.data.errors.forEach(x => {
                                if (typeof x.error == 'string')
                                    this.errors.push(x.error);
                            });
                        else if (typeof p0.data.errors == 'object' && typeof p0.data.errors.error == 'string')
                            this.errors.push(p0.data.errors.error);
                    }
                }
            }
        }
    }
}
exports.SchemaServiceError = SchemaServiceError;

import { ErrorTypes, SdkError } from '../sdkError'
import { Http2FetchError } from '../http2client'

export class SchemaServiceError extends SdkError {
    sourceError: Error
    status: number
    path?: string
    timestamp?: string
    schemaId?: string
    version?: number
    errors: string[] = []

    constructor(errorType: keyof typeof ErrorTypes, ...params: any[]) {
        super(errorType, ...params)
        this.name = 'schema.sdk.cortex'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, SchemaServiceError)
        }

        if (params.length > 0) {
            let p0 = params[0]
            if (p0 instanceof Error) {
                this.sourceError = p0
                if (p0 instanceof Http2FetchError) {
                    this.errorType = 'SchemaApi'
                    this.status = p0.status;
                    if (p0.data !== undefined) {
                        ({ path: this.path, timestamp: this.timestamp, schemaId: this.schemaId, version: this.version } = p0.data)
                        if (p0.data.message !== undefined) this.message = p0.data.message
                        if (Array.isArray(p0.data.errors)) p0.data.errors.forEach(x => {
                            if (typeof x.error == 'string') this.errors.push(x.error)
                        })
                        else if (typeof p0.data.errors == 'object' && typeof p0.data.errors.error == 'string')
                            this.errors.push(p0.data.errors.error)
                    }
                }
            }
        }
    }
}
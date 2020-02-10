import { ErrorTypes, SdkError } from '../sdkError';
export declare class SchemaServiceError extends SdkError {
    sourceError: Error;
    status: number;
    path?: string;
    timestamp?: string;
    schemaId?: string;
    version?: number;
    errors: string[];
    constructor(errorType: keyof typeof ErrorTypes, ...params: any[]);
}

import { ErrorTypes, SdkError } from '../sdkError';
import { QueryApiError } from './query_service_models';
/**
 * Error subclass provided by `QueryService` objects that allow developer get
 * insights on why the operation could not be completed
 */
export declare class QueryServiceError extends SdkError {
    /**
     * Underlying class that originated the error
     */
    sourceError: Error;
    /**
     * http2 status code in the response
     */
    status: number;
    /**
     * Array of errors provided by the Cortex API GW
     */
    errors: QueryApiError[];
    /**
     * job identifier
     */
    jobId?: string;
    /**
     * The called uri that triggered the error
     */
    uri?: string;
    constructor(errorType: keyof typeof ErrorTypes, ...params: any[]);
}

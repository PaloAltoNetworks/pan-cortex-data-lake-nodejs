import { SdkError } from '../sdkError';
import { JobState } from './query_service_models';
/**
 * Error subclass provided by `QueryServiceClient` objects that allow developer
 * get insights on why the operation could not be completed
 */
export declare class QueryServiceClientError extends SdkError {
    /**
     * State of the job when the error was thrown
     */
    status: JobState;
    /**
     * Job identifier associated to the operation
     */
    jobId: string;
    constructor(jobId: string, ...params: any[]);
}

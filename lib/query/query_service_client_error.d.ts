import { SdkError } from '../sdkError';
import { JobState, QueryJobDetail } from './query_service_models';
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
    /**
     * Provides additional information in case of error
     */
    errors?: {
        message: string;
        context: string;
    }[];
    constructor(jobId: string, ...params: any[]);
    /**
     * Takes a QueryJobDetail object (assuming to be in `FAIL` state) and builds
     * a QueryServiceClientError from its data
     * @param jobDetail object to take data from
     * @returns a new QueryServiceClientError object
     */
    static fromQueryJobDetails(jobDetail: QueryJobDetail): QueryServiceClientError;
}

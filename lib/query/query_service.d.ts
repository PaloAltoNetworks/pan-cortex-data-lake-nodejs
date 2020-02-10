import { Http2Fetch, Http2FetchOpts, CredentialTuple } from '../http2client';
import { Query, QueryJobResp, GetJobResultsOpts, GetJobsListOpts, QueryJobDetail, QueryResultResp } from './query_service_models';
/**
 * Provides an abstraction of the Cortex Data Lake Query Service API
 */
export declare class QueryService {
    private client;
    private defCred;
    private static errorTools;
    private static pathQsCombo;
    /**
     * Use the constructor if you want to create a new `QueryService` object
     * sharing an existing `HttpdFetch` object with other objects.
     * @param client `Http2Fetch` object that will be used by the new instance
     * @param cred optional `Credentials` object that will override any
     * operation requiring the provided `Http2Fetch` object
     */
    constructor(client: Http2Fetch, cred?: CredentialTuple);
    /**
     * Factory method that builds an `Http2Fetch` object and then instantiates a
     * new `QueryService` object on top of it.
     * @param opts parameters for the `Http2Fetch` constructor
     * @returns an instantiated `QueryService` object
     */
    static factory(opts: Http2FetchOpts): QueryService;
    /**
     * Cortex Data Lake contains log data that is written by various products and apps, such as Palo Alto Networks
     * next-generation firewalls. Use this API to create query jobs that return log data matching your query criteria.
     * You define query criteria using a SQL SELECT statement that you specify as part of the payload for this API.
     * You can obtain query results using the uri contained in this API’s response object.
     *
     * @param body A JSON object that must provide a SQL SELECT statement which is used to identify the log records
     * that you want to retrieve. Optionally, you can also specify a jobId (strongly recommended), and various
     * query parameters which are useful for tuning query performance.
     * @param cred optional credentials object that will override the one used
     * by the `QueryService` or its underlying `Http2Fetch` object
     * @returns the request response
     */
    createJob(body: Query, cred?: CredentialTuple): Promise<QueryJobResp>;
    /**
     * Retrieve a page of query results for the query job identified by {jobId}.
     *
     * @param jobId The ID of the job for which you want to retrieve a page of results.
     * This ID is contained in the jobId response field that is returned when you create the query job.
     * @param opts Request options
     * @param cred optional credentials object that will override the one used
     * by the `QueryService` or its underlying `Http2Fetch` object
     * @returns the request response
     */
    getJobResults(jobId: String, opts?: GetJobResultsOpts, cred?: CredentialTuple): Promise<QueryResultResp>;
    /**
     * Retrieves a list of query jobs that match specified criteria. The retrieved list of jobs is in chronological order,
     * from most recent to oldest.
     * @param opts
     * @param cred optional credentials object that will override the one used
     * by the `QueryService` or its underlying `Http2Fetch` object
     * @returns the request response
     */
    getJobsList(opts: GetJobsListOpts, cred?: CredentialTuple): Promise<QueryJobDetail[]>;
    /**
     * Returns detailed information about the query job. This information includes the job’s current state,
     * it’s submission and start times, the estimated amount of work that has been completed, and the original
     * query parameters (SELECT statement, page size, and so forth.)
     *
     * @param jobId ID of the query job for which you want to retrieve job information.
     * @param cred optional credentials object that will override the one used
     * by the `QueryService` or its underlying `Http2Fetch` object
     * @returns the request response
     */
    getJobStatus(jobId: string, cred?: CredentialTuple): Promise<QueryJobDetail>;
    /**
     * Asks the query service to cancel the identified query job. A successful response to this call does
     * not guarantee that the job has been, or will be, canceled.
     * @param jobId ID of the query job that you want to cancel. This ID is contained in the jobId response field that is returned when you create the query job.
     * @param cred optional credentials object that will override the one used
     * by the `QueryService` or its underlying `Http2Fetch` object
     */
    deleteJob(jobId: string, cred?: CredentialTuple): Promise<void>;
    /**
     * Closes the underlying `Http2Fetch` client session
     */
    close(entryPoint?: string): Promise<void>;
}

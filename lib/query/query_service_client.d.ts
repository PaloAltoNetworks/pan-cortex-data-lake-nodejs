/// <reference types="node" />
/// <reference types="node" />
import { QueryService } from './query_service';
import { ReadableOptions } from 'stream';
import { Http2FetchOpts, Http2Fetch, CredentialTuple } from '../http2client';
/**
 * Configuration options for the QueryServiceClient object
 */
export interface QueryServiceClientOptions {
    /**
     * Max amount of response items in each page (default: 400)
     */
    pageSize?: number;
    /**
     * Milliseconds to wait before attempting the same call again (default: 200)
     */
    delay?: number;
    /**
     * Amount of retries of the same call (default: 10)
     */
    retries?: number;
    /**
     * By default the iterator or stream will close the underlying HTTP2 session
     * at the end. Switch this flag to false to revert this behaviour. You might
     * want to do so when sharing the same underlying HTTP2 object amongs many clients.
     */
    autoClose?: boolean;
    /**
     * Default `Credentials` object to use by this object's methods
     */
    cred?: CredentialTuple;
}
/**
 * `QueryService` subclass that provides high-level interfaces to consume Cortex
 * Data Lake queries.
 */
export declare class QueryServiceClient extends QueryService {
    pageSize: number;
    delay: number;
    retries: number;
    autoClose: boolean;
    /**
     * Use the constructor if you want to create a new `QueryService` object
     * sharing an existing `HttpdFetch` object with other objects.
     * @param client `Http2Fetch` object that will be used by the new instance
     * @param cred optional `Credentials` object that will override any
     * operation requiring the `provided Http2Fetch`object
     */
    constructor(client: Http2Fetch, ops?: QueryServiceClientOptions);
    static factory(opts?: Http2FetchOpts & QueryServiceClientOptions): QueryServiceClient;
    /**
     * Leverages ES2018 async iterator feature to return a way to iterate a
     * Cortex Data Lake query response
     * @param sqlCommand SQL query to be executed
     * @param cred optional `Credentials` object that will override default
     * credentials used either in the underlying `QueryService` or `Http2Fetch` objects.
     * @returns AsyncIterableIterator object to navigate the query results
     */
    iterator(sqlCommand: string, cred?: CredentialTuple): AsyncIterableIterator<any[]>;
    /**
     * Use this method to consume a Cortex Data Lake query reseult set using the
     * NodeJS's Stream.Readable interface
     * @param sqlCommand SQL query to be executed
     * @param cred optional `Credentials` object that will override default
     * credentials used either in the underlying `QueryService` or `Http2Fetch` objects.
     * @returns Stream.Readable object to navigate the query results
     */
    stream(sqlCommand: string, opts?: ReadableOptions, cred?: CredentialTuple): NodeJS.ReadableStream;
}

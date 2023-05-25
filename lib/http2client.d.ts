/// <reference types="node" />
import * as http2 from 'http2';
import { Credentials } from '.';
import { ErrorTypes } from './sdkError';
/**
 * Error subclass that allows the developer get insights on reasons for a HTTP2 error
 */
export declare class Http2FetchError extends Error {
    /**
     * Value of the HTTP2 status header that triggered the error
     */
    status: number;
    /**
     * Body of the HTTP2 response that triggered the errror
     */
    data: any;
    constructor(message: string, status: number, data: any);
}
/**
 * Options to configure a `Http2Fetch` object
 */
export interface Http2FetchOpts extends http2.ClientSessionOptions, http2.SecureClientSessionOptions {
    /**
     * Cortex API default FQDN to use in operations that do not provide an
     * explicit `Credentials` object
     */
    cortexBaseFqdn?: string;
    /**
     * If provided, then all operations will use this `Credential`'s JWT token
     */
    cortexDefCredentials?: Credentials;
    /**
     * How many milliseconds to keep an inactive HTTP2 session to the Cortex API
     * GW (default = 60000)
     */
    cortexTimeout?: number;
}
/**
 * Credential tuple
 */
export type CredentialTuple = {
    /**
     * Data lake unique identifier for this credential object
     */
    dlid: string;
    /**
     * Credential object
     */
    cred: Credentials;
    /**
     * the CDL API entry point fqdn
     */
    entrypoint: string;
};
/**
 * Class that implements a HTTP2 fetch object
 */
export declare class Http2Fetch {
    private sessions;
    private defaultEntrypoint;
    private defaultCred?;
    private opts?;
    private cortexTimeout;
    /**
     * Instantiates a new `Http2Fetch` object from provided configuration
     * options. You must provide, at least, `cortexBaseFqdn` or `cortexDefCredentials`
     * @param opts configuration options for this object
     * @returns an instantiated `Http2Fetch` object
     */
    constructor(opts?: Http2FetchOpts);
    init(c?: CredentialTuple): Promise<void>;
    private refreshSessions;
    private lazyInit;
    private lazyUpdateHeaders;
    /**
     * Attemps to close the underlying session (if any)
     */
    close(entryPoint?: string): Promise<void>;
    private op;
    /**
     * Execute a HTTP2 GET operation
     * @param path relative path of the endpoint to consume
     * @param opts options for the HTTP2 request
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    get(path: string, opts?: http2.ClientSessionRequestOptions, cred?: CredentialTuple): Promise<{
        data: any;
        status: number;
    }>;
    /**
     * Execute a HTTP2 DELETE operation
     * @param path relative path of the endpoint to consume
     * @param opts options for the HTTP2 request
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    delete(path: string, opts?: http2.ClientSessionRequestOptions, cred?: CredentialTuple): Promise<{
        data: any;
        status: number;
    }>;
    /**
     * Execute a HTTP2 POST operation
     * @param path relative path of the endpoint to consume
     * @param body body content to be send
     * @param opts options for the HTTP2 request
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    post(path: string, body: any, contentType?: string, opts?: http2.ClientSessionRequestOptions, cred?: CredentialTuple): Promise<{
        data: any;
        status: number;
    }>;
    /**
     * Execute a HTTP2 PUT operation
     * @param path relative path of the endpoint to consume
     * @param body body content to be send
     * @param opts options for the HTTP2 request
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    put(path: string, body: any, contentType?: string, opts?: http2.ClientSessionRequestOptions, cred?: CredentialTuple): Promise<{
        data: any;
        status: number;
    }>;
}
/**
 * Convenience class to rety operations that could fail. The type `<P>`
 * describes the class type that would be thrown (if needed)
 */
export declare class ErrorTools<P extends Error> {
    private errClass;
    /**
     * Builds an `ErrorTools` object
     * @param errClass error class constructor that should be used if something
     * needs to be thrown
     */
    constructor(errClass: new (errorType: keyof typeof ErrorTypes, ...params: any[]) => P);
    /**
     * Attempt an operation that returns an object of type `<T>` and that
     * consumes arguments of type `...<U>[]`
     * @param errorType The type of the error that will be thrown in case of failure
     * @param op function to call
     * @param params arguments to pass to the previous function
     * @returns the response provided by the function
     */
    tryOp<T, U extends any[]>(errorType: keyof typeof ErrorTypes, op: ((...params: U) => T), ...params: U): T;
    /**
     * Attempt an async operation that returns an object of type `<T>` and that
     * consumes arguments of type `...<U>[]`
     * @param errorType The type of the error that will be thrown in case of failure
     * @param op function to call
     * @param params arguments to pass to the previous function
     * @returns a promise with the response provided by the function
     */
    tryAsyncOp<T, U extends any[]>(errorType: keyof typeof ErrorTypes, op: ((...params: U) => Promise<T>), ...params: U): Promise<T>;
    /**
     * Attempt a HTTP2 POST operation
     * @param errorType The type of the error that will be thrown in case of failure
     * @param client `Http2Fetch` object to leverage for this operation
     * @param path relative path of the endpoint to consume
     * @param body body content to be send
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    tryPost(errorType: keyof typeof ErrorTypes, client: Http2Fetch, path: string, body: any, cred?: CredentialTuple): Promise<{
        data: any;
        status: number;
    }>;
    /**
     * Attempt a HTTP2 PUT operation
     * @param errorType The type of the error that will be thrown in case of failure
     * @param client `Http2Fetch` object to leverage for this operation
     * @param path relative path of the endpoint to consume
     * @param body body content to be send
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    tryPut(errorType: keyof typeof ErrorTypes, client: Http2Fetch, path: string, body: any, cred?: CredentialTuple): Promise<{
        data: any;
        status: number;
    }>;
    /**
     * Attempt a HTTP2 GET operation
     * @param errorType The type of the error that will be thrown in case of failure
     * @param client `Http2Fetch` object to leverage for this operation
     * @param path relative path of the endpoint to consume
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    tryGet(errorType: keyof typeof ErrorTypes, client: Http2Fetch, path: string, cred?: CredentialTuple): Promise<{
        data: any;
        status: number;
    }>;
    /**
     * Attempt a HTTP2 DELETE operation
     * @param errorType The type of the error that will be thrown in case of failure
     * @param client `Http2Fetch` object to leverage for this operation
     * @param path relative path of the endpoint to consume
     * @param cred optional `Credentials` object for this call to override default one
     * @returns the response data and status code value
     */
    tryDelete(errorType: keyof typeof ErrorTypes, client: Http2Fetch, path: string, cred?: CredentialTuple): Promise<{
        data: any;
        status: number;
    }>;
    /**
     * Generic retrier method that attemps to execute a function that returns a
     * response of type `<O>` provided an arrays of arguments of type `<T>`
     * @param errorType The type of the error that will be thrown in case of failure
     * @param n amount of times to attempt the operation (defaults to 3)
     * @param delay amounts of milliseconds to delay between attempts (defaults
     * to 100)
     * @param op function to be called
     * @param params arguments to be passed to the previous function
     * @returns a Promise with the result of the called function
     */
    retrier<T, O>(errorType: keyof typeof ErrorTypes, n: number | undefined, delay: number | undefined, op: (...args: T[]) => Promise<O>, ...params: T[]): Promise<O>;
}

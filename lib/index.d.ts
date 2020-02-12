/**
 * Both schema service and ingestion service depend on the package avsc. That package contains
 * code that can run either in the server (NodeJS) or in the browser. So it references the type
 * 'Blob' that would be available if you add the 'dom' library to the tsconfig file. I don't like
 * adding dom because IDE autocompletion provides too many options.
 * With this declaration we override the tsc compilation errors of the avsc package
 */
declare global {
    type Blob = any;
}
export * from './query';
export * from './schema';
export { ErrorTypes } from './sdkError';
export { Http2Fetch, CredentialTuple } from './http2client';
export { setLogLevel, logLevel } from './commonlogger';
export { FetchOptions, HttpMethod } from './fetch';
export { cortexConstants } from './constants';
/**
 * The basic methods expected from an object that provides credentials
 */
export interface Credentials {
    /**
     * Method to retrieve the token data
     * @param force flag to force the response to contain token data even if a
     * refresh operation has not been performed. An undefined response can be
     * used by the consumer to keep using its cached data.
     * @returns credential data either if the `force` flag was set of a refresh
     * operation produced new credential material.
     */
    getToken(force?: boolean): Promise<string | undefined>;
    /**
     * Cortex Data Lake API fqdn (region) this token in valid for
     */
    getEntryPoint(): string;
}

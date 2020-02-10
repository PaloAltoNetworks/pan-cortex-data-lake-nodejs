/**
 * Supported HTTP methods
 */
export declare type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
/**
 * Interface that describes the options for a HTTP request
 */
export interface FetchOptions {
    method: HttpMethod;
    headers?: {
        [i: string]: string;
    };
    body?: string;
    timeout?: number;
}
declare class FetchResponse {
    ok: boolean;
    status: number;
    statusText: string;
    size: number;
    private data;
    private constructor();
    text(): string;
    json(): any;
    static response(ok: boolean, data?: string, status?: number): FetchResponse;
}
/**
 * convenience method to perform a HTTP request
 * @param url url of the endpoint
 * @param ops configuration options for the request
 * @returns the request response
 */
export declare function fetch(url: string, ops: FetchOptions): Promise<FetchResponse>;
export {};

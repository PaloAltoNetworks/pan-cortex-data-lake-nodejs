import { Http2FetchOpts, Http2Fetch } from '../http2client';
import { SchemaServicePayload, VersionedSchemaServicePayload, Metadata, SchemaServiceResponse } from './schema_service_models';
export declare class SchemaService {
    private client;
    private static errorTools;
    constructor(client: Http2Fetch);
    static factory(opts: Http2FetchOpts): SchemaService;
    get(): Promise<VersionedSchemaServicePayload[]>;
    get(schemaId: string): Promise<VersionedSchemaServicePayload>;
    private pxt;
    create(payload: SchemaServicePayload): Promise<SchemaServiceResponse>;
    create(schemaId: string, metadata: Metadata, structure: string): Promise<SchemaServiceResponse>;
    create(schemaId: string, metadata: Metadata, value: {}, doc?: string): Promise<SchemaServiceResponse>;
    update(payload: SchemaServicePayload): Promise<SchemaServiceResponse>;
    update(schemaId: string, metadata: Metadata, structure: string): Promise<SchemaServiceResponse>;
    update(schemaId: string, metadata: Metadata, value: {}, doc?: string): Promise<SchemaServiceResponse>;
    delete(schemaId: string): Promise<void>;
    /**
     * Closes the underlying http2fetch client
     */
    close(): Promise<void>;
}

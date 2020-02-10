import { Http2FetchOpts, ErrorTools, Http2Fetch } from '../http2client'
import { cortexConstants } from '../constants'
import { SchemaServicePayload, VersionedSchemaServicePayload, parseSchemaServiceGetResponse, Metadata, parseSchemaServiceResponse, SchemaServiceResponse } from './schema_service_models'
import { SchemaServiceError } from './schema_service_error'
import { commonLogger, logLevel } from '../commonlogger'
import { Type, types, schema } from 'avsc'

const { EP_SCHEMA } = cortexConstants

type pxtPayload = {
    metadata: Metadata,
    schemaId: string,
    structure: string
}

function schemaBuilder(name: string, value: {}, namespace?: string, doc?: string): string {
    if (!(/^[a-zA-Z_][a-zA-Z0-9_]+$/.test(name + namespace))) throw new Error('name and namespace must adhere to /^[a-zA-Z_][a-zA-Z0-9_]+$/')
    let valueType = Type.forValue(value) as types.RecordType
    return JSON.stringify(Type.forSchema([{
        name: name,
        doc: doc,
        namespace: namespace,
        type: 'record',
        fields: valueType.fields
    }] as schema.DefinedType[], { noAnonymousTypes: true }).schema())
}

export class SchemaService {
    private client: Http2Fetch
    private static errorTools = new ErrorTools(SchemaServiceError)

    constructor(client: Http2Fetch) {
        this.client = client
    }

    static factory(opts: Http2FetchOpts): SchemaService {
        return new SchemaService(new Http2Fetch(opts))
    }

    public async get(): Promise<VersionedSchemaServicePayload[]>;
    public async get(schemaId: string): Promise<VersionedSchemaServicePayload>;
    async get(schemaId?: string): Promise<VersionedSchemaServicePayload | (VersionedSchemaServicePayload | undefined)[]> {
        let path = EP_SCHEMA
        if (schemaId !== undefined) path += '/' + schemaId
        let { data, status } = await SchemaService.errorTools.tryGet('ComsError', this.client, path)
        if (schemaId === undefined) {
            if (Array.isArray(data)) {
                return data.map(parseSchemaServiceGetResponse)
            }
            throw new SchemaServiceError('ParseError', 'SchemaService response is not an array')
        }
        let parsedResponse = parseSchemaServiceGetResponse(data)
        if (parsedResponse === undefined) {
            commonLogger(logLevel.INFO, `ParseError: status code ${status} with unparseable response: ${JSON.stringify(data)}`)
            throw new SchemaServiceError('ParseError', 'Unable to parse SchemaService response')
        }
        return parsedResponse
    }

    private async pxt(post: boolean, firstArg: string | SchemaServicePayload, metadata?: Metadata, fourthArg?: string | {}, doc?: string): Promise<SchemaServiceResponse> {
        let body: {
            metadata: Metadata,
            schemaId: string,
            structure: string
        }
        let schemaId: string
        if (typeof firstArg == 'string') {
            schemaId = firstArg
            if (metadata === undefined || fourthArg === undefined) throw new Error('arguments do not adhere to the interface')
            let structureStr: string
            if (typeof fourthArg == 'string') structureStr = fourthArg
            else {
                const [part1, part2] = firstArg.split('.')
                structureStr = schemaBuilder(part2 ? part2 : part1, fourthArg, part2 ? part1 : undefined, doc)
            }
            body = {
                metadata: metadata,
                schemaId: firstArg,
                structure: structureStr
            }
        } else {
            schemaId = firstArg.schemaId
            body = {
                metadata: firstArg.metadata,
                schemaId: firstArg.schemaId,
                structure: JSON.stringify(firstArg.structure)
            }
        }
        let data: any
        let status: number
        if (post) ({ data, status } = await SchemaService.errorTools.tryPost('ComsError', this.client, EP_SCHEMA, body))
        else ({ data, status } = await SchemaService.errorTools.tryPut('ComsError', this.client, EP_SCHEMA + '/' + schemaId, body))
        let parsedResponse = parseSchemaServiceResponse(data)
        if (parsedResponse === undefined) {
            commonLogger(logLevel.INFO, `ParseError: status code ${status} with unparseable response: ${JSON.stringify(data)}`)
            throw new SchemaServiceError('ParseError', 'Unable to parse SchemaService response')
        }
        return parsedResponse
    }

    public async create(payload: SchemaServicePayload): Promise<SchemaServiceResponse>
    public async create(schemaId: string, metadata: Metadata, structure: string): Promise<SchemaServiceResponse>
    public async create(schemaId: string, metadata: Metadata, value: {}, doc?: string): Promise<SchemaServiceResponse>
    create(firstArg: string | SchemaServicePayload, metadata?: Metadata, fourthArg?: string | {}, doc?: string): Promise<SchemaServiceResponse> {
        return this.pxt(true, firstArg, metadata, fourthArg, doc)
    }

    public async update(payload: SchemaServicePayload): Promise<SchemaServiceResponse>
    public async update(schemaId: string, metadata: Metadata, structure: string): Promise<SchemaServiceResponse>
    public async update(schemaId: string, metadata: Metadata, value: {}, doc?: string): Promise<SchemaServiceResponse>
    update(firstArg: string | SchemaServicePayload, metadata?: Metadata, fourthArg?: string | {}, doc?: string): Promise<SchemaServiceResponse> {
        return this.pxt(false, firstArg, metadata, fourthArg, doc)
    }

    public async delete(schemaId: string): Promise<void> {
        await SchemaService.errorTools.tryDelete('ComsError', this.client, EP_SCHEMA + '/' + schemaId)
    }

    /**
     * Closes the underlying http2fetch client
     */
    close(): Promise<void> {
        return this.client.close(undefined)
    }
}
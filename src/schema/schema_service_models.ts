import { Type, Schema } from 'avsc'
import { commonLogger, logLevel } from '../commonlogger'

type timeUnit = 'MINUTES' | 'HOURS' | 'DAYS' | 'MONTHS' | 'YEARS'
const timeUnits = ['MINUTES', 'HOURS', 'DAYS', 'MONTHS', 'YEARS']

type operation = 'ALL' | 'QUERY' | 'STREAM' | 'COMPUTE'
const operation = ['ALL', 'QUERY', 'STREAM', 'COMPUTE']

type MetadataPartionSchema = {
    /**
     * time unit for partition scheme, like minute, hour, day
     */
    timeUnit: timeUnit,
    /**
     * frequency of partition, like 5 minute
     */
    frequency: Number
}

function isSchemaMetadataPartionSchema(obj: any): obj is MetadataPartionSchema {
    return obj && typeof obj == 'object' &&
        obj.timeUnit && timeUnits.includes(obj.timeUnit) &&
        !isNaN(obj.frequency)
}

function isStringArray(obj: any): obj is string[] {
    return Array.isArray(obj) && (obj as Array<any>).every(x => typeof x == 'string')
}

type _Metadata = {
    partitionColumn: string,
    tags: string[] | null,
    timestampColumns: string[] | null,
    timestampFormat: string | null,
    timestampTimezone: string | null,
    partitionScheme: MetadataPartionSchema
    public: boolean,
    derived: boolean,
    idColumn: string | null,
    clusterColumns: string[] | null,
    doc: string | null,
    operations: operation,
    logical_types: string[] | null,
    memoryAllocation: string[] | null,
    streamPartitionFactor: Number
}

export type Metadata = {
    partitionColumn: string,
    tags?: string[],
    timestampColumns?: string[],
    /**
     * timestamp format
     */
    timestampFormat?: string,
    /**
     * timestamp Timezone
     */
    timestampTimezone?: string,
    /**
     * how data will be partitioned
     */
    partitionScheme: MetadataPartionSchema
    public: boolean,
    derived: boolean,
    idColumn?: string,
    clusterColumns?: string[],
    /**
     * documentation about metadata section
     */
    doc?: string,
    operations: operation,
    logical_types?: string[],
    memoryAllocation?: string[],
    streamPartitionFactor: Number
}

function isMetadata(obj: any): obj is _Metadata {
    return obj && typeof obj == 'object' &&
        typeof obj.partitionColumn == 'string' &&
        (isStringArray(obj.tags) || obj.tags === null) &&
        (isStringArray(obj.timestampColumns) || obj.timestampColumns === null) &&
        (typeof obj.timestampFormat == 'string' || obj.timestampFormat === null) &&
        (typeof obj.timestampTimezone == 'string' || obj.timestampTimezone === null) &&
        isSchemaMetadataPartionSchema(obj.partitionScheme) &&
        typeof obj.public == 'boolean' &&
        typeof obj.derived == 'boolean' &&
        (typeof obj.idColumn == 'string' || obj.idColumn === null) &&
        (isStringArray(obj.clusterColumns) || obj.clusterColumns == null) &&
        (typeof obj.doc == 'string' || obj.doc === null) &&
        operation.includes(obj.operations) &&
        (isStringArray(obj.logical_types) || obj.logical_types === null) &&
        (isStringArray(obj.memoryAllocation) || obj.memoryAllocation === null) &&
        !isNaN(obj.streamPartitionFactor)
}

function trimMetadata(obj: _Metadata): Metadata {
    let response: Metadata = {
        derived: obj.derived,
        operations: obj.operations,
        partitionColumn: obj.partitionColumn,
        partitionScheme: obj.partitionScheme,
        public: obj.public,
        streamPartitionFactor: obj.streamPartitionFactor
    }
    for (const property of ['tag', 'timestampColumns', 'timestampFormat',
        'timestampTimezone', 'idColumn', 'clusterColumns', 'doc', 'logical_types',
        'memoryAllocation'])
        if (obj[property] !== null) response[property] = obj[property]
    return response
}

export type SchemaServicePayload = {
    schemaId: string,
    structure: Schema,
    metadata: Metadata
    // version: number
}

export type VersionedSchemaServicePayload = SchemaServicePayload & { version: number }

export function parseSchemaServiceGetResponse(obj: any): VersionedSchemaServicePayload | undefined {
    let struct: Type | null
    if (!(obj && typeof (obj.schemaId) == 'string') && typeof (obj.version) == 'number' && isMetadata(obj.metadata)) {
        commonLogger(logLevel.WARNING, `response ${obj} is not a valid Schema Service response payload`)
        return undefined
    }
    try {
        let [namespace, name] = obj.schemaId.split('.')
        struct = Type.forSchema(JSON.parse(obj.structure), name ? { namespace: namespace } : undefined)
    } catch {
        commonLogger(logLevel.WARNING, `schema ${obj.schemaId} version ${obj.version} AVRO structure failed to be parsed.`)
        return undefined
    }
    return {
        schemaId: obj.schemaId,
        version: obj.version,
        structure: struct,
        metadata: trimMetadata(obj.metadata)
    }
}

export type SchemaServiceResponse = {
    schemaId: string,
    version: number | null,
    errors: { error: string }[]
}

export function parseSchemaServiceResponse(obj: any): SchemaServiceResponse | undefined {
    if (typeof obj == 'object') {
        let version: number | null
        if (obj.version === null) version = null
        else {
            version = Number.parseInt(obj.version)
            if (isNaN(version)) return undefined
        }
        if (!(typeof obj.schemaId == 'string' &&
            (obj.errors === null ||
                Array.isArray(obj.errors) &&
                obj.errors.every((x: any) => typeof x == 'object' && typeof x.error == 'string')))) return undefined
        return {
            schemaId: obj.schemaId,
            version: version,
            errors: obj.errors
        }
    }
}

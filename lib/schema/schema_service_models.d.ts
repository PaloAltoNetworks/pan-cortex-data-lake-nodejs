import { Schema } from 'avsc';
declare type timeUnit = 'MINUTES' | 'HOURS' | 'DAYS' | 'MONTHS' | 'YEARS';
declare type operation = 'ALL' | 'QUERY' | 'STREAM' | 'COMPUTE';
declare const operation: string[];
declare type MetadataPartionSchema = {
    /**
     * time unit for partition scheme, like minute, hour, day
     */
    timeUnit: timeUnit;
    /**
     * frequency of partition, like 5 minute
     */
    frequency: Number;
};
export declare type Metadata = {
    partitionColumn: string;
    tags?: string[];
    timestampColumns?: string[];
    /**
     * timestamp format
     */
    timestampFormat?: string;
    /**
     * timestamp Timezone
     */
    timestampTimezone?: string;
    /**
     * how data will be partitioned
     */
    partitionScheme: MetadataPartionSchema;
    public: boolean;
    derived: boolean;
    idColumn?: string;
    clusterColumns?: string[];
    /**
     * documentation about metadata section
     */
    doc?: string;
    operations: operation;
    logical_types?: string[];
    memoryAllocation?: string[];
    streamPartitionFactor: Number;
};
export declare type SchemaServicePayload = {
    schemaId: string;
    structure: Schema;
    metadata: Metadata;
};
export declare type VersionedSchemaServicePayload = SchemaServicePayload & {
    version: number;
};
export declare function parseSchemaServiceGetResponse(obj: any): VersionedSchemaServicePayload | undefined;
export declare type SchemaServiceResponse = {
    schemaId: string;
    version: number | null;
    errors: {
        error: string;
    }[];
};
export declare function parseSchemaServiceResponse(obj: any): SchemaServiceResponse | undefined;
export {};

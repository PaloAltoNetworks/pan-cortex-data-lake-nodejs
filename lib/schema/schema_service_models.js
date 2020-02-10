"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const avsc_1 = require("avsc");
const commonlogger_1 = require("../commonlogger");
const timeUnits = ['MINUTES', 'HOURS', 'DAYS', 'MONTHS', 'YEARS'];
const operation = ['ALL', 'QUERY', 'STREAM', 'COMPUTE'];
function isSchemaMetadataPartionSchema(obj) {
    return obj && typeof obj == 'object' &&
        obj.timeUnit && timeUnits.includes(obj.timeUnit) &&
        !isNaN(obj.frequency);
}
function isStringArray(obj) {
    return Array.isArray(obj) && obj.every(x => typeof x == 'string');
}
function isMetadata(obj) {
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
        !isNaN(obj.streamPartitionFactor);
}
function trimMetadata(obj) {
    let response = {
        derived: obj.derived,
        operations: obj.operations,
        partitionColumn: obj.partitionColumn,
        partitionScheme: obj.partitionScheme,
        public: obj.public,
        streamPartitionFactor: obj.streamPartitionFactor
    };
    for (const property of ['tag', 'timestampColumns', 'timestampFormat',
        'timestampTimezone', 'idColumn', 'clusterColumns', 'doc', 'logical_types',
        'memoryAllocation'])
        if (obj[property] !== null)
            response[property] = obj[property];
    return response;
}
function parseSchemaServiceGetResponse(obj) {
    let struct;
    if (!(obj && typeof (obj.schemaId) == 'string') && typeof (obj.version) == 'number' && isMetadata(obj.metadata)) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.WARNING, `response ${obj} is not a valid Schema Service response payload`);
        return undefined;
    }
    try {
        let [namespace, name] = obj.schemaId.split('.');
        struct = avsc_1.Type.forSchema(JSON.parse(obj.structure), name ? { namespace: namespace } : undefined);
    }
    catch (_a) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.WARNING, `schema ${obj.schemaId} version ${obj.version} AVRO structure failed to be parsed.`);
        return undefined;
    }
    return {
        schemaId: obj.schemaId,
        version: obj.version,
        structure: struct,
        metadata: trimMetadata(obj.metadata)
    };
}
exports.parseSchemaServiceGetResponse = parseSchemaServiceGetResponse;
function parseSchemaServiceResponse(obj) {
    if (typeof obj == 'object') {
        let version;
        if (obj.version === null)
            version = null;
        else {
            version = Number.parseInt(obj.version);
            if (isNaN(version))
                return undefined;
        }
        if (!(typeof obj.schemaId == 'string' &&
            (obj.errors === null ||
                Array.isArray(obj.errors) &&
                    obj.errors.every((x) => typeof x == 'object' && typeof x.error == 'string'))))
            return undefined;
        return {
            schemaId: obj.schemaId,
            version: version,
            errors: obj.errors
        };
    }
}
exports.parseSchemaServiceResponse = parseSchemaServiceResponse;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http2client_1 = require("../http2client");
const constants_1 = require("../constants");
const schema_service_models_1 = require("./schema_service_models");
const schema_service_error_1 = require("./schema_service_error");
const commonlogger_1 = require("../commonlogger");
const avsc_1 = require("avsc");
const { EP_SCHEMA } = constants_1.cortexConstants;
function schemaBuilder(name, value, namespace, doc) {
    if (!(/^[a-zA-Z_][a-zA-Z0-9_]+$/.test(name + namespace)))
        throw new Error('name and namespace must adhere to /^[a-zA-Z_][a-zA-Z0-9_]+$/');
    let valueType = avsc_1.Type.forValue(value);
    return JSON.stringify(avsc_1.Type.forSchema([{
            name: name,
            doc: doc,
            namespace: namespace,
            type: 'record',
            fields: valueType.fields
        }], { noAnonymousTypes: true }).schema());
}
class SchemaService {
    constructor(client) {
        this.client = client;
    }
    static factory(opts) {
        return new SchemaService(new http2client_1.Http2Fetch(opts));
    }
    async get(schemaId) {
        let path = EP_SCHEMA;
        if (schemaId !== undefined)
            path += '/' + schemaId;
        let { data, status } = await SchemaService.errorTools.tryGet('ComsError', this.client, path);
        if (schemaId === undefined) {
            if (Array.isArray(data)) {
                return data.map(schema_service_models_1.parseSchemaServiceGetResponse);
            }
            throw new schema_service_error_1.SchemaServiceError('ParseError', 'SchemaService response is not an array');
        }
        let parsedResponse = schema_service_models_1.parseSchemaServiceGetResponse(data);
        if (parsedResponse === undefined) {
            commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `ParseError: status code ${status} with unparseable response: ${JSON.stringify(data)}`);
            throw new schema_service_error_1.SchemaServiceError('ParseError', 'Unable to parse SchemaService response');
        }
        return parsedResponse;
    }
    async pxt(post, firstArg, metadata, fourthArg, doc) {
        let body;
        let schemaId;
        if (typeof firstArg == 'string') {
            schemaId = firstArg;
            if (metadata === undefined || fourthArg === undefined)
                throw new Error('arguments do not adhere to the interface');
            let structureStr;
            if (typeof fourthArg == 'string')
                structureStr = fourthArg;
            else {
                const [part1, part2] = firstArg.split('.');
                structureStr = schemaBuilder(part2 ? part2 : part1, fourthArg, part2 ? part1 : undefined, doc);
            }
            body = {
                metadata: metadata,
                schemaId: firstArg,
                structure: structureStr
            };
        }
        else {
            schemaId = firstArg.schemaId;
            body = {
                metadata: firstArg.metadata,
                schemaId: firstArg.schemaId,
                structure: JSON.stringify(firstArg.structure)
            };
        }
        let data;
        let status;
        if (post)
            ({ data, status } = await SchemaService.errorTools.tryPost('ComsError', this.client, EP_SCHEMA, body));
        else
            ({ data, status } = await SchemaService.errorTools.tryPut('ComsError', this.client, EP_SCHEMA + '/' + schemaId, body));
        let parsedResponse = schema_service_models_1.parseSchemaServiceResponse(data);
        if (parsedResponse === undefined) {
            commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `ParseError: status code ${status} with unparseable response: ${JSON.stringify(data)}`);
            throw new schema_service_error_1.SchemaServiceError('ParseError', 'Unable to parse SchemaService response');
        }
        return parsedResponse;
    }
    create(firstArg, metadata, fourthArg, doc) {
        return this.pxt(true, firstArg, metadata, fourthArg, doc);
    }
    update(firstArg, metadata, fourthArg, doc) {
        return this.pxt(false, firstArg, metadata, fourthArg, doc);
    }
    async delete(schemaId) {
        await SchemaService.errorTools.tryDelete('ComsError', this.client, EP_SCHEMA + '/' + schemaId);
    }
    /**
     * Closes the underlying http2fetch client
     */
    close() {
        return this.client.close(undefined);
    }
}
SchemaService.errorTools = new http2client_1.ErrorTools(schema_service_error_1.SchemaServiceError);
exports.SchemaService = SchemaService;

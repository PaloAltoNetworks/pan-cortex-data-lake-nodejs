[@paloaltonetworks/pan-cortex-data-lake](../README.md) / QueryServiceClient

# Class: QueryServiceClient

`QueryService` subclass that provides high-level interfaces to consume Cortex
Data Lake queries.

## Hierarchy

- [`QueryService`](QueryService.md)

  ↳ **`QueryServiceClient`**

## Table of contents

### Constructors

- [constructor](QueryServiceClient.md#constructor)

### Properties

- [autoClose](QueryServiceClient.md#autoclose)
- [delay](QueryServiceClient.md#delay)
- [pageSize](QueryServiceClient.md#pagesize)
- [retries](QueryServiceClient.md#retries)

### Methods

- [close](QueryServiceClient.md#close)
- [createJob](QueryServiceClient.md#createjob)
- [deleteJob](QueryServiceClient.md#deletejob)
- [getJobResults](QueryServiceClient.md#getjobresults)
- [getJobStatus](QueryServiceClient.md#getjobstatus)
- [getJobsList](QueryServiceClient.md#getjobslist)
- [iterator](QueryServiceClient.md#iterator)
- [stream](QueryServiceClient.md#stream)
- [factory](QueryServiceClient.md#factory)

## Constructors

### constructor

• **new QueryServiceClient**(`client`, `ops?`)

Use the constructor if you want to create a new `QueryService` object
sharing an existing `HttpdFetch` object with other objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`Http2Fetch`](Http2Fetch.md) | `Http2Fetch` object that will be used by the new instance |
| `ops?` | [`QueryServiceClientOptions`](../interfaces/QueryServiceClientOptions.md) | - |

#### Overrides

[QueryService](QueryService.md).[constructor](QueryService.md#constructor)

#### Defined in

[src/query/query_service_client.ts:227](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L227)

## Properties

### autoClose

• **autoClose**: `boolean`

#### Defined in

[src/query/query_service_client.ts:218](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L218)

___

### delay

• **delay**: `number`

#### Defined in

[src/query/query_service_client.ts:216](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L216)

___

### pageSize

• **pageSize**: `number`

#### Defined in

[src/query/query_service_client.ts:215](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L215)

___

### retries

• **retries**: `number`

#### Defined in

[src/query/query_service_client.ts:217](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L217)

## Methods

### close

▸ **close**(`entryPoint?`): `Promise`<`void`\>

Closes the underlying `Http2Fetch` client session

#### Parameters

| Name | Type |
| :------ | :------ |
| `entryPoint?` | `string` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[QueryService](QueryService.md).[close](QueryService.md#close)

#### Defined in

[src/query/query_service.ts:182](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L182)

___

### createJob

▸ **createJob**(`body`, `cred?`): `Promise`<`QueryJobResp`\>

Cortex Data Lake contains log data that is written by various products and apps, such as Palo Alto Networks
next-generation firewalls. Use this API to create query jobs that return log data matching your query criteria.
You define query criteria using a SQL SELECT statement that you specify as part of the payload for this API.
You can obtain query results using the uri contained in this API’s response object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | [`Query`](../README.md#query) | A JSON object that must provide a SQL SELECT statement which is used to identify the log records that you want to retrieve. Optionally, you can also specify a jobId (strongly recommended), and various query parameters which are useful for tuning query performance. |
| `cred?` | [`CredentialTuple`](../README.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

#### Returns

`Promise`<`QueryJobResp`\>

the request response

#### Inherited from

[QueryService](QueryService.md).[createJob](QueryService.md#createjob)

#### Defined in

[src/query/query_service.ts:81](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L81)

___

### deleteJob

▸ **deleteJob**(`jobId`, `cred?`): `Promise`<`void`\>

Asks the query service to cancel the identified query job. A successful response to this call does
not guarantee that the job has been, or will be, canceled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jobId` | `string` | ID of the query job that you want to cancel. This ID is contained in the jobId response field that is returned when you create the query job. |
| `cred?` | [`CredentialTuple`](../README.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

#### Returns

`Promise`<`void`\>

#### Inherited from

[QueryService](QueryService.md).[deleteJob](QueryService.md#deletejob)

#### Defined in

[src/query/query_service.ts:168](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L168)

___

### getJobResults

▸ **getJobResults**(`jobId`, `opts?`, `cred?`): `Promise`<`QueryResultResp`\>

Retrieve a page of query results for the query job identified by {jobId}.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jobId` | `String` | The ID of the job for which you want to retrieve a page of results. This ID is contained in the jobId response field that is returned when you create the query job. |
| `opts?` | `GetJobResultsOpts` | Request options |
| `cred?` | [`CredentialTuple`](../README.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

#### Returns

`Promise`<`QueryResultResp`\>

the request response

#### Inherited from

[QueryService](QueryService.md).[getJobResults](QueryService.md#getjobresults)

#### Defined in

[src/query/query_service.ts:104](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L104)

___

### getJobStatus

▸ **getJobStatus**(`jobId`, `cred?`): `Promise`<`QueryJobDetail`\>

Returns detailed information about the query job. This information includes the job’s current state,
it’s submission and start times, the estimated amount of work that has been completed, and the original
query parameters (SELECT statement, page size, and so forth.)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jobId` | `string` | ID of the query job for which you want to retrieve job information. |
| `cred?` | [`CredentialTuple`](../README.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

#### Returns

`Promise`<`QueryJobDetail`\>

the request response

#### Inherited from

[QueryService](QueryService.md).[getJobStatus](QueryService.md#getjobstatus)

#### Defined in

[src/query/query_service.ts:148](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L148)

___

### getJobsList

▸ **getJobsList**(`opts`, `cred?`): `Promise`<`QueryJobDetail`[]\>

Retrieves a list of query jobs that match specified criteria. The retrieved list of jobs is in chronological order, 
from most recent to oldest.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `GetJobsListOpts` |  |
| `cred?` | [`CredentialTuple`](../README.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

#### Returns

`Promise`<`QueryJobDetail`[]\>

the request response

#### Inherited from

[QueryService](QueryService.md).[getJobsList](QueryService.md#getjobslist)

#### Defined in

[src/query/query_service.ts:125](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L125)

___

### iterator

▸ **iterator**(`sqlCommand`, `cred?`): `AsyncIterableIterator`<`any`[]\>

Leverages ES2018 async iterator feature to return a way to iterate a
Cortex Data Lake query response

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sqlCommand` | `string` | SQL query to be executed |
| `cred?` | [`CredentialTuple`](../README.md#credentialtuple) | optional `Credentials` object that will override default credentials used either in the underlying `QueryService` or `Http2Fetch` objects. |

#### Returns

`AsyncIterableIterator`<`any`[]\>

AsyncIterableIterator object to navigate the query results

#### Defined in

[src/query/query_service_client.ts:247](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L247)

___

### stream

▸ **stream**(`sqlCommand`, `opts?`, `cred?`): `ReadableStream`

Use this method to consume a Cortex Data Lake query reseult set using the
NodeJS's Stream.Readable interface

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sqlCommand` | `string` | SQL query to be executed |
| `opts?` | `ReadableOptions` | - |
| `cred?` | [`CredentialTuple`](../README.md#credentialtuple) | optional `Credentials` object that will override default credentials used either in the underlying `QueryService` or `Http2Fetch` objects. |

#### Returns

`ReadableStream`

Stream.Readable object to navigate the query results

#### Defined in

[src/query/query_service_client.ts:259](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L259)

___

### factory

▸ `Static` **factory**(`opts?`): [`QueryServiceClient`](QueryServiceClient.md)

Factory method that builds an `Http2Fetch` object and then instantiates a
new `QueryService` object on top of it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts?` | `Http2FetchOpts` & [`QueryServiceClientOptions`](../interfaces/QueryServiceClientOptions.md) | parameters for the `Http2Fetch` constructor |

#### Returns

[`QueryServiceClient`](QueryServiceClient.md)

an instantiated `QueryService` object

#### Overrides

[QueryService](QueryService.md).[factory](QueryService.md#factory)

#### Defined in

[src/query/query_service_client.ts:235](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L235)

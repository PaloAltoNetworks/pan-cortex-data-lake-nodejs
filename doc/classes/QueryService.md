[@paloaltonetworks/pan-cortex-data-lake](../README.md) / QueryService

# Class: QueryService

Provides an abstraction of the Cortex Data Lake Query Service API

## Hierarchy

- **`QueryService`**

  ↳ [`QueryServiceClient`](QueryServiceClient.md)

## Table of contents

### Constructors

- [constructor](QueryService.md#constructor)

### Methods

- [close](QueryService.md#close)
- [createJob](QueryService.md#createjob)
- [deleteJob](QueryService.md#deletejob)
- [getJobResults](QueryService.md#getjobresults)
- [getJobStatus](QueryService.md#getjobstatus)
- [getJobsList](QueryService.md#getjobslist)
- [factory](QueryService.md#factory)

## Constructors

### constructor

• **new QueryService**(`client`, `cred?`)

Use the constructor if you want to create a new `QueryService` object
sharing an existing `HttpdFetch` object with other objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`Http2Fetch`](Http2Fetch.md) | `Http2Fetch` object that will be used by the new instance |
| `cred?` | [`CredentialTuple`](../README.md#credentialtuple) | optional `Credentials` object that will override any operation requiring the provided `Http2Fetch` object |

#### Defined in

[src/query/query_service.ts:53](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L53)

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

#### Defined in

[src/query/query_service.ts:125](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L125)

___

### factory

▸ `Static` **factory**(`opts`): [`QueryService`](QueryService.md)

Factory method that builds an `Http2Fetch` object and then instantiates a
new `QueryService` object on top of it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `Http2FetchOpts` | parameters for the `Http2Fetch` constructor |

#### Returns

[`QueryService`](QueryService.md)

an instantiated `QueryService` object

#### Defined in

[src/query/query_service.ts:64](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L64)

[pan-cortex-data-lake](../README.md) › ["query/query_service_client"](../modules/_query_query_service_client_.md) › [QueryServiceClient](_query_query_service_client_.queryserviceclient.md)

# Class: QueryServiceClient

`QueryService` subclass that provides high-level interfaces to consume Cortex
Data Lake queries.

## Hierarchy

* [QueryService](_query_query_service_.queryservice.md)

  ↳ **QueryServiceClient**

## Index

### Constructors

* [constructor](_query_query_service_client_.queryserviceclient.md#constructor)

### Properties

* [autoClose](_query_query_service_client_.queryserviceclient.md#autoclose)
* [delay](_query_query_service_client_.queryserviceclient.md#delay)
* [pageSize](_query_query_service_client_.queryserviceclient.md#pagesize)
* [retries](_query_query_service_client_.queryserviceclient.md#retries)

### Methods

* [close](_query_query_service_client_.queryserviceclient.md#close)
* [createJob](_query_query_service_client_.queryserviceclient.md#createjob)
* [deleteJob](_query_query_service_client_.queryserviceclient.md#deletejob)
* [getJobResults](_query_query_service_client_.queryserviceclient.md#getjobresults)
* [getJobStatus](_query_query_service_client_.queryserviceclient.md#getjobstatus)
* [getJobsList](_query_query_service_client_.queryserviceclient.md#getjobslist)
* [iterator](_query_query_service_client_.queryserviceclient.md#iterator)
* [stream](_query_query_service_client_.queryserviceclient.md#stream)
* [factory](_query_query_service_client_.queryserviceclient.md#static-factory)

## Constructors

###  constructor

\+ **new QueryServiceClient**(`client`: [Http2Fetch](_http2client_.http2fetch.md), `ops?`: [QueryServiceClientOptions](../interfaces/_query_query_service_client_.queryserviceclientoptions.md)): *[QueryServiceClient](_query_query_service_client_.queryserviceclient.md)*

*Overrides [QueryService](_query_query_service_.queryservice.md).[constructor](_query_query_service_.queryservice.md#constructor)*

Defined in src/query/query_service_client.ts:216

Use the constructor if you want to create a new `QueryService` object
sharing an existing `HttpdFetch` object with other objects.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`client` | [Http2Fetch](_http2client_.http2fetch.md) | `Http2Fetch` object that will be used by the new instance |
`ops?` | [QueryServiceClientOptions](../interfaces/_query_query_service_client_.queryserviceclientoptions.md) | - |

**Returns:** *[QueryServiceClient](_query_query_service_client_.queryserviceclient.md)*

## Properties

###  autoClose

• **autoClose**: *boolean*

Defined in src/query/query_service_client.ts:216

___

###  delay

• **delay**: *number*

Defined in src/query/query_service_client.ts:214

___

###  pageSize

• **pageSize**: *number*

Defined in src/query/query_service_client.ts:213

___

###  retries

• **retries**: *number*

Defined in src/query/query_service_client.ts:215

## Methods

###  close

▸ **close**(`entryPoint?`: undefined | string): *Promise‹void›*

*Inherited from [QueryService](_query_query_service_.queryservice.md).[close](_query_query_service_.queryservice.md#close)*

Defined in src/query/query_service.ts:182

Closes the underlying `Http2Fetch` client session

**Parameters:**

Name | Type |
------ | ------ |
`entryPoint?` | undefined &#124; string |

**Returns:** *Promise‹void›*

___

###  createJob

▸ **createJob**(`body`: [Query](../modules/_query_query_service_models_.md#query), `cred?`: [CredentialTuple](../modules/_index_.md#credentialtuple)): *Promise‹[QueryJobResp](../modules/_query_query_service_models_.md#queryjobresp)›*

*Inherited from [QueryService](_query_query_service_.queryservice.md).[createJob](_query_query_service_.queryservice.md#createjob)*

Defined in src/query/query_service.ts:81

Cortex Data Lake contains log data that is written by various products and apps, such as Palo Alto Networks
next-generation firewalls. Use this API to create query jobs that return log data matching your query criteria.
You define query criteria using a SQL SELECT statement that you specify as part of the payload for this API.
You can obtain query results using the uri contained in this API’s response object.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`body` | [Query](../modules/_query_query_service_models_.md#query) | A JSON object that must provide a SQL SELECT statement which is used to identify the log records that you want to retrieve. Optionally, you can also specify a jobId (strongly recommended), and various query parameters which are useful for tuning query performance. |
`cred?` | [CredentialTuple](../modules/_index_.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

**Returns:** *Promise‹[QueryJobResp](../modules/_query_query_service_models_.md#queryjobresp)›*

the request response

___

###  deleteJob

▸ **deleteJob**(`jobId`: string, `cred?`: [CredentialTuple](../modules/_index_.md#credentialtuple)): *Promise‹void›*

*Inherited from [QueryService](_query_query_service_.queryservice.md).[deleteJob](_query_query_service_.queryservice.md#deletejob)*

Defined in src/query/query_service.ts:168

Asks the query service to cancel the identified query job. A successful response to this call does
not guarantee that the job has been, or will be, canceled.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jobId` | string | ID of the query job that you want to cancel. This ID is contained in the jobId response field that is returned when you create the query job. |
`cred?` | [CredentialTuple](../modules/_index_.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object  |

**Returns:** *Promise‹void›*

___

###  getJobResults

▸ **getJobResults**(`jobId`: String, `opts?`: [GetJobResultsOpts](../modules/_query_query_service_models_.md#getjobresultsopts), `cred?`: [CredentialTuple](../modules/_index_.md#credentialtuple)): *Promise‹[QueryResultResp](../modules/_query_query_service_models_.md#queryresultresp)›*

*Inherited from [QueryService](_query_query_service_.queryservice.md).[getJobResults](_query_query_service_.queryservice.md#getjobresults)*

Defined in src/query/query_service.ts:104

Retrieve a page of query results for the query job identified by {jobId}.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jobId` | String | The ID of the job for which you want to retrieve a page of results. This ID is contained in the jobId response field that is returned when you create the query job. |
`opts?` | [GetJobResultsOpts](../modules/_query_query_service_models_.md#getjobresultsopts) | Request options |
`cred?` | [CredentialTuple](../modules/_index_.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

**Returns:** *Promise‹[QueryResultResp](../modules/_query_query_service_models_.md#queryresultresp)›*

the request response

___

###  getJobStatus

▸ **getJobStatus**(`jobId`: string, `cred?`: [CredentialTuple](../modules/_index_.md#credentialtuple)): *Promise‹[QueryJobDetail](../modules/_query_query_service_models_.md#queryjobdetail)›*

*Inherited from [QueryService](_query_query_service_.queryservice.md).[getJobStatus](_query_query_service_.queryservice.md#getjobstatus)*

Defined in src/query/query_service.ts:148

Returns detailed information about the query job. This information includes the job’s current state,
it’s submission and start times, the estimated amount of work that has been completed, and the original
query parameters (SELECT statement, page size, and so forth.)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jobId` | string | ID of the query job for which you want to retrieve job information. |
`cred?` | [CredentialTuple](../modules/_index_.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

**Returns:** *Promise‹[QueryJobDetail](../modules/_query_query_service_models_.md#queryjobdetail)›*

the request response

___

###  getJobsList

▸ **getJobsList**(`opts`: [GetJobsListOpts](../modules/_query_query_service_models_.md#getjobslistopts), `cred?`: [CredentialTuple](../modules/_index_.md#credentialtuple)): *Promise‹[QueryJobDetail](../modules/_query_query_service_models_.md#queryjobdetail)[]›*

*Inherited from [QueryService](_query_query_service_.queryservice.md).[getJobsList](_query_query_service_.queryservice.md#getjobslist)*

Defined in src/query/query_service.ts:125

Retrieves a list of query jobs that match specified criteria. The retrieved list of jobs is in chronological order,
from most recent to oldest.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opts` | [GetJobsListOpts](../modules/_query_query_service_models_.md#getjobslistopts) | - |
`cred?` | [CredentialTuple](../modules/_index_.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

**Returns:** *Promise‹[QueryJobDetail](../modules/_query_query_service_models_.md#queryjobdetail)[]›*

the request response

___

###  iterator

▸ **iterator**(`sqlCommand`: string, `cred?`: [CredentialTuple](../modules/_index_.md#credentialtuple)): *AsyncIterableIterator‹any[]›*

Defined in src/query/query_service_client.ts:245

Leverages ES2018 async iterator feature to return a way to iterate a
Cortex Data Lake query response

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sqlCommand` | string | SQL query to be executed |
`cred?` | [CredentialTuple](../modules/_index_.md#credentialtuple) | optional `Credentials` object that will override default credentials used either in the underlying `QueryService` or `Http2Fetch` objects. |

**Returns:** *AsyncIterableIterator‹any[]›*

AsyncIterableIterator object to navigate the query results

___

###  stream

▸ **stream**(`sqlCommand`: string, `opts?`: ReadableOptions, `cred?`: [CredentialTuple](../modules/_index_.md#credentialtuple)): *ReadableStream*

Defined in src/query/query_service_client.ts:257

Use this method to consume a Cortex Data Lake query reseult set using the
NodeJS's Stream.Readable interface

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sqlCommand` | string | SQL query to be executed |
`opts?` | ReadableOptions | - |
`cred?` | [CredentialTuple](../modules/_index_.md#credentialtuple) | optional `Credentials` object that will override default credentials used either in the underlying `QueryService` or `Http2Fetch` objects. |

**Returns:** *ReadableStream*

Stream.Readable object to navigate the query results

___

### `Static` factory

▸ **factory**(`opts?`: [Http2FetchOpts](../interfaces/_http2client_.http2fetchopts.md) & [QueryServiceClientOptions](../interfaces/_query_query_service_client_.queryserviceclientoptions.md)): *[QueryServiceClient](_query_query_service_client_.queryserviceclient.md)*

*Overrides [QueryService](_query_query_service_.queryservice.md).[factory](_query_query_service_.queryservice.md#static-factory)*

Defined in src/query/query_service_client.ts:233

**Parameters:**

Name | Type |
------ | ------ |
`opts?` | [Http2FetchOpts](../interfaces/_http2client_.http2fetchopts.md) & [QueryServiceClientOptions](../interfaces/_query_query_service_client_.queryserviceclientoptions.md) |

**Returns:** *[QueryServiceClient](_query_query_service_client_.queryserviceclient.md)*

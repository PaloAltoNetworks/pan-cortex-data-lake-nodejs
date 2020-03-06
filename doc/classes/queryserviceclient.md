[@paloaltonetworks/pan-cortex-data-lake](../README.md) › [QueryServiceClient](queryserviceclient.md)

# Class: QueryServiceClient

`QueryService` subclass that provides high-level interfaces to consume Cortex
Data Lake queries.

## Hierarchy

* [QueryService](queryservice.md)

  ↳ **QueryServiceClient**

## Index

### Constructors

* [constructor](queryserviceclient.md#constructor)

### Properties

* [autoClose](queryserviceclient.md#autoclose)
* [delay](queryserviceclient.md#delay)
* [pageSize](queryserviceclient.md#pagesize)
* [retries](queryserviceclient.md#retries)

### Methods

* [close](queryserviceclient.md#close)
* [createJob](queryserviceclient.md#createjob)
* [deleteJob](queryserviceclient.md#deletejob)
* [getJobResults](queryserviceclient.md#getjobresults)
* [getJobStatus](queryserviceclient.md#getjobstatus)
* [getJobsList](queryserviceclient.md#getjobslist)
* [iterator](queryserviceclient.md#iterator)
* [stream](queryserviceclient.md#stream)
* [factory](queryserviceclient.md#static-factory)

## Constructors

###  constructor

\+ **new QueryServiceClient**(`client`: [Http2Fetch](http2fetch.md), `ops?`: [QueryServiceClientOptions](../interfaces/queryserviceclientoptions.md)): *[QueryServiceClient](queryserviceclient.md)*

*Overrides [QueryService](queryservice.md).[constructor](queryservice.md#constructor)*

*Defined in [src/query/query_service_client.ts:218](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L218)*

Use the constructor if you want to create a new `QueryService` object
sharing an existing `HttpdFetch` object with other objects.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`client` | [Http2Fetch](http2fetch.md) | `Http2Fetch` object that will be used by the new instance |
`ops?` | [QueryServiceClientOptions](../interfaces/queryserviceclientoptions.md) | - |

**Returns:** *[QueryServiceClient](queryserviceclient.md)*

## Properties

###  autoClose

• **autoClose**: *boolean*

*Defined in [src/query/query_service_client.ts:218](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L218)*

___

###  delay

• **delay**: *number*

*Defined in [src/query/query_service_client.ts:216](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L216)*

___

###  pageSize

• **pageSize**: *number*

*Defined in [src/query/query_service_client.ts:215](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L215)*

___

###  retries

• **retries**: *number*

*Defined in [src/query/query_service_client.ts:217](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L217)*

## Methods

###  close

▸ **close**(`entryPoint?`: undefined | string): *Promise‹void›*

*Inherited from [QueryService](queryservice.md).[close](queryservice.md#close)*

*Defined in [src/query/query_service.ts:182](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L182)*

Closes the underlying `Http2Fetch` client session

**Parameters:**

Name | Type |
------ | ------ |
`entryPoint?` | undefined &#124; string |

**Returns:** *Promise‹void›*

___

###  createJob

▸ **createJob**(`body`: [Query](../README.md#query), `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹[QueryJobResp](../README.md#queryjobresp)›*

*Inherited from [QueryService](queryservice.md).[createJob](queryservice.md#createjob)*

*Defined in [src/query/query_service.ts:81](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L81)*

Cortex Data Lake contains log data that is written by various products and apps, such as Palo Alto Networks
next-generation firewalls. Use this API to create query jobs that return log data matching your query criteria.
You define query criteria using a SQL SELECT statement that you specify as part of the payload for this API.
You can obtain query results using the uri contained in this API’s response object.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`body` | [Query](../README.md#query) | A JSON object that must provide a SQL SELECT statement which is used to identify the log records that you want to retrieve. Optionally, you can also specify a jobId (strongly recommended), and various query parameters which are useful for tuning query performance. |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

**Returns:** *Promise‹[QueryJobResp](../README.md#queryjobresp)›*

the request response

___

###  deleteJob

▸ **deleteJob**(`jobId`: string, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹void›*

*Inherited from [QueryService](queryservice.md).[deleteJob](queryservice.md#deletejob)*

*Defined in [src/query/query_service.ts:168](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L168)*

Asks the query service to cancel the identified query job. A successful response to this call does
not guarantee that the job has been, or will be, canceled.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jobId` | string | ID of the query job that you want to cancel. This ID is contained in the jobId response field that is returned when you create the query job. |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object  |

**Returns:** *Promise‹void›*

___

###  getJobResults

▸ **getJobResults**(`jobId`: String, `opts?`: [GetJobResultsOpts](../README.md#getjobresultsopts), `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹[QueryResultResp](../README.md#queryresultresp)›*

*Inherited from [QueryService](queryservice.md).[getJobResults](queryservice.md#getjobresults)*

*Defined in [src/query/query_service.ts:104](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L104)*

Retrieve a page of query results for the query job identified by {jobId}.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jobId` | String | The ID of the job for which you want to retrieve a page of results. This ID is contained in the jobId response field that is returned when you create the query job. |
`opts?` | [GetJobResultsOpts](../README.md#getjobresultsopts) | Request options |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

**Returns:** *Promise‹[QueryResultResp](../README.md#queryresultresp)›*

the request response

___

###  getJobStatus

▸ **getJobStatus**(`jobId`: string, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹[QueryJobDetail](../README.md#queryjobdetail)›*

*Inherited from [QueryService](queryservice.md).[getJobStatus](queryservice.md#getjobstatus)*

*Defined in [src/query/query_service.ts:148](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L148)*

Returns detailed information about the query job. This information includes the job’s current state,
it’s submission and start times, the estimated amount of work that has been completed, and the original
query parameters (SELECT statement, page size, and so forth.)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jobId` | string | ID of the query job for which you want to retrieve job information. |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

**Returns:** *Promise‹[QueryJobDetail](../README.md#queryjobdetail)›*

the request response

___

###  getJobsList

▸ **getJobsList**(`opts`: [GetJobsListOpts](../README.md#getjobslistopts), `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹[QueryJobDetail](../README.md#queryjobdetail)[]›*

*Inherited from [QueryService](queryservice.md).[getJobsList](queryservice.md#getjobslist)*

*Defined in [src/query/query_service.ts:125](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L125)*

Retrieves a list of query jobs that match specified criteria. The retrieved list of jobs is in chronological order,
from most recent to oldest.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opts` | [GetJobsListOpts](../README.md#getjobslistopts) | - |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional credentials object that will override the one used by the `QueryService` or its underlying `Http2Fetch` object |

**Returns:** *Promise‹[QueryJobDetail](../README.md#queryjobdetail)[]›*

the request response

___

###  iterator

▸ **iterator**(`sqlCommand`: string, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *AsyncIterableIterator‹any[]›*

*Defined in [src/query/query_service_client.ts:247](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L247)*

Leverages ES2018 async iterator feature to return a way to iterate a
Cortex Data Lake query response

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sqlCommand` | string | SQL query to be executed |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional `Credentials` object that will override default credentials used either in the underlying `QueryService` or `Http2Fetch` objects. |

**Returns:** *AsyncIterableIterator‹any[]›*

AsyncIterableIterator object to navigate the query results

___

###  stream

▸ **stream**(`sqlCommand`: string, `opts?`: ReadableOptions, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *ReadableStream*

*Defined in [src/query/query_service_client.ts:259](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L259)*

Use this method to consume a Cortex Data Lake query reseult set using the
NodeJS's Stream.Readable interface

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sqlCommand` | string | SQL query to be executed |
`opts?` | ReadableOptions | - |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional `Credentials` object that will override default credentials used either in the underlying `QueryService` or `Http2Fetch` objects. |

**Returns:** *ReadableStream*

Stream.Readable object to navigate the query results

___

### `Static` factory

▸ **factory**(`opts?`: [Http2FetchOpts](../interfaces/http2fetchopts.md) & [QueryServiceClientOptions](../interfaces/queryserviceclientoptions.md)): *[QueryServiceClient](queryserviceclient.md)*

*Overrides [QueryService](queryservice.md).[factory](queryservice.md#static-factory)*

*Defined in [src/query/query_service_client.ts:235](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L235)*

**Parameters:**

Name | Type |
------ | ------ |
`opts?` | [Http2FetchOpts](../interfaces/http2fetchopts.md) & [QueryServiceClientOptions](../interfaces/queryserviceclientoptions.md) |

**Returns:** *[QueryServiceClient](queryserviceclient.md)*

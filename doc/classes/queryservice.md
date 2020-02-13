[pan-cortex-data-lake](../README.md) › [QueryService](queryservice.md)

# Class: QueryService

Provides an abstraction of the Cortex Data Lake Query Service API

## Hierarchy

* **QueryService**

  ↳ [QueryServiceClient](queryserviceclient.md)

## Index

### Constructors

* [constructor](queryservice.md#constructor)

### Methods

* [close](queryservice.md#close)
* [createJob](queryservice.md#createjob)
* [deleteJob](queryservice.md#deletejob)
* [getJobResults](queryservice.md#getjobresults)
* [getJobStatus](queryservice.md#getjobstatus)
* [getJobsList](queryservice.md#getjobslist)
* [factory](queryservice.md#static-factory)

## Constructors

###  constructor

\+ **new QueryService**(`client`: [Http2Fetch](http2fetch.md), `cred?`: [CredentialTuple](../README.md#credentialtuple)): *[QueryService](queryservice.md)*

Defined in src/query/query_service.ts:44

Use the constructor if you want to create a new `QueryService` object
sharing an existing `HttpdFetch` object with other objects.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`client` | [Http2Fetch](http2fetch.md) | `Http2Fetch` object that will be used by the new instance |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional `Credentials` object that will override any operation requiring the provided `Http2Fetch` object  |

**Returns:** *[QueryService](queryservice.md)*

## Methods

###  close

▸ **close**(`entryPoint?`: undefined | string): *Promise‹void›*

Defined in src/query/query_service.ts:182

Closes the underlying `Http2Fetch` client session

**Parameters:**

Name | Type |
------ | ------ |
`entryPoint?` | undefined &#124; string |

**Returns:** *Promise‹void›*

___

###  createJob

▸ **createJob**(`body`: [Query](../README.md#query), `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹[QueryJobResp](../README.md#queryjobresp)›*

Defined in src/query/query_service.ts:81

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

Defined in src/query/query_service.ts:168

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

Defined in src/query/query_service.ts:104

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

Defined in src/query/query_service.ts:148

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

Defined in src/query/query_service.ts:125

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

### `Static` factory

▸ **factory**(`opts`: [Http2FetchOpts](../interfaces/http2fetchopts.md)): *[QueryService](queryservice.md)*

Defined in src/query/query_service.ts:64

Factory method that builds an `Http2Fetch` object and then instantiates a
new `QueryService` object on top of it.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opts` | [Http2FetchOpts](../interfaces/http2fetchopts.md) | parameters for the `Http2Fetch` constructor |

**Returns:** *[QueryService](queryservice.md)*

an instantiated `QueryService` object

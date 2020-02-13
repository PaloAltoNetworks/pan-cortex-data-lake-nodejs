[pan-cortex-data-lake](../README.md) › ["query/query_service_models"](_query_query_service_models_.md)

# External module: "query/query_service_models"

## Index

### Type aliases

* [GetJobResultsOpts](_query_query_service_models_.md#getjobresultsopts)
* [GetJobsListOpts](_query_query_service_models_.md#getjobslistopts)
* [JobState](_query_query_service_models_.md#jobstate)
* [Query](_query_query_service_models_.md#query)
* [QueryApiError](_query_query_service_models_.md#queryapierror)
* [QueryJobDetail](_query_query_service_models_.md#queryjobdetail)
* [QueryJobResp](_query_query_service_models_.md#queryjobresp)
* [QueryParams](_query_query_service_models_.md#queryparams)
* [QueryResultResp](_query_query_service_models_.md#queryresultresp)
* [ResultFormat](_query_query_service_models_.md#resultformat)

### Functions

* [isQueryApiError](_query_query_service_models_.md#isqueryapierror)
* [isQueryJobDetail](_query_query_service_models_.md#isqueryjobdetail)
* [isQueryJobResp](_query_query_service_models_.md#isqueryjobresp)
* [isQueryResultResp](_query_query_service_models_.md#isqueryresultresp)

## Type aliases

###  GetJobResultsOpts

Ƭ **GetJobResultsOpts**: *object*

Defined in src/query/query_service_models.ts:308

Configuration options for the Get Job Results Query API call

#### Type declaration:

* **maxWait**? : *undefined | number*

* **offset**? : *undefined | number*

* **pageCursor**? : *string | null*

* **pageNumber**? : *undefined | number*

* **pageSize**? : *undefined | number*

* **resultFormat**? : *[ResultFormat](_query_query_service_models_.md#resultformat)*

___

###  GetJobsListOpts

Ƭ **GetJobsListOpts**: *object*

Defined in src/query/query_service_models.ts:355

Configuration options for the Get Jobs List Query API call

#### Type declaration:

* **createdAfter**? : *undefined | number*

* **maxJobs**? : *undefined | number*

* **state**? : *keyof typeof jobState*

* **tenantId**: *string*

___

###  JobState

Ƭ **JobState**: *"PENDING" | "RUNNING" | "DONE" | "FAILED" | "CANCELLED"*

Defined in src/query/query_service_models.ts:134

The different states a query job can be

___

###  Query

Ƭ **Query**: *object*

Defined in src/query/query_service_models.ts:84

Interface that describes a query job

#### Type declaration:

* **jobId**? : *undefined | string*

* **params**: *[QueryParams](_query_query_service_models_.md#queryparams)*

___

###  QueryApiError

Ƭ **QueryApiError**: *object*

Defined in src/query/query_service_models.ts:277

Model of a query service error response

#### Type declaration:

* **context**? : *undefined | string*

* **errorCode**? : *undefined | number*

* **message**? : *undefined | string*

___

###  QueryJobDetail

Ƭ **QueryJobDetail**: *object*

Defined in src/query/query_service_models.ts:143

Detailed information about a query job

#### Type declaration:

* **endTime**? : *undefined | number*

* **jobId**: *string*

* **params**? : *[QueryParams](_query_query_service_models_.md#queryparams)*

* **progress**? : *undefined | object*

* **startTime**? : *undefined | number*

* **state**: *[JobState](_query_query_service_models_.md#jobstate)*

* **statistics**? : *undefined | object*

* **submitTime**: *number*

___

###  QueryJobResp

Ƭ **QueryJobResp**: *object*

Defined in src/query/query_service_models.ts:99

Models the response provided by the Query Service

#### Type declaration:

* **jobId**: *string*

* **uri**: *string*

___

###  QueryParams

Ƭ **QueryParams**: *object*

Defined in src/query/query_service_models.ts:17

Describes mandatory and optional configuration options to perform a query job

#### Type declaration:

* **dialect**? : *undefined | string*

* **properties**? : *undefined | object*

* **query**: *string*

___

###  QueryResultResp

Ƭ **QueryResultResp**: *object*

Defined in src/query/query_service_models.ts:215

Model of a query service result response

#### Type declaration:

* **jobId**: *string*

* **page**(): *object*

  * **pageCursor**: *string | null*

  * **result**(): *object*

    * **data**: *any[]*

* **resultFormat**: *[ResultFormat](_query_query_service_models_.md#resultformat)*

* **rowsInJob**? : *undefined | number*

* **rowsInPage**? : *undefined | number*

* **schema**? : *undefined | object*

* **state**: *[JobState](_query_query_service_models_.md#jobstate)*

___

###  ResultFormat

Ƭ **ResultFormat**: *"valuesArray" | "valuesDictionary"*

Defined in src/query/query_service_models.ts:210

The different formats a job query result could have

## Functions

###  isQueryApiError

▸ **isQueryApiError**(`obj`: any): *obj is QueryApiError*

Defined in src/query/query_service_models.ts:298

Convenience type guard function to check if an object conforms to the
`QueryApiError` interface

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | the object to be checked |

**Returns:** *obj is QueryApiError*

true if the interface is satisfied

___

###  isQueryJobDetail

▸ **isQueryJobDetail**(`obj`: any): *obj is QueryJobDetail*

Defined in src/query/query_service_models.ts:195

Convenience type guard function to check if a object conforms to the
`QueryJobDetail` interface

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | object to be checked |

**Returns:** *obj is QueryJobDetail*

true is the interface is satisfied

___

###  isQueryJobResp

▸ **isQueryJobResp**(`obj`: any): *obj is QueryJobResp*

Defined in src/query/query_service_models.ts:116

Convenience type guard function to check if a object conforms to the
`QueryJobResp` interface.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | object to be checked |

**Returns:** *obj is QueryJobResp*

true if the interface is satisfied

___

###  isQueryResultResp

▸ **isQueryResultResp**(`obj`: any): *obj is QueryResultResp*

Defined in src/query/query_service_models.ts:264

Convenienece method to check if an object conforms to the `QueryResultResp` interface

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | object to be checked |

**Returns:** *obj is QueryResultResp*

true if the interface is satisfied

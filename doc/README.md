[@paloaltonetworks/pan-cortex-data-lake](README.md)

# @paloaltonetworks/pan-cortex-data-lake

## Index

### Modules

* [__global](modules/__global.md)

### Enumerations

* [ErrorTypes](enums/errortypes.md)
* [jobState](enums/jobstate.md)
* [logLevel](enums/loglevel.md)
* [readableStates](enums/readablestates.md)

### Classes

* [ErrorTools](classes/errortools.md)
* [Http2Fetch](classes/http2fetch.md)
* [Http2FetchError](classes/http2fetcherror.md)
* [QueryIterator](classes/queryiterator.md)
* [QueryService](classes/queryservice.md)
* [QueryServiceClient](classes/queryserviceclient.md)
* [QueryServiceClientError](classes/queryserviceclienterror.md)
* [QueryServiceError](classes/queryserviceerror.md)
* [QueryStream](classes/querystream.md)
* [QueryWorker](classes/queryworker.md)
* [SdkError](classes/sdkerror.md)

### Interfaces

* [Credentials](interfaces/credentials.md)
* [Http2FetchOpts](interfaces/http2fetchopts.md)
* [QueryServiceClientOptions](interfaces/queryserviceclientoptions.md)

### Type aliases

* [CredentialTuple](README.md#credentialtuple)
* [GetJobResultsOpts](README.md#getjobresultsopts)
* [GetJobsListOpts](README.md#getjobslistopts)
* [JobState](README.md#jobstate)
* [Query](README.md#query)
* [QueryApiError](README.md#queryapierror)
* [QueryJobDetail](README.md#queryjobdetail)
* [QueryJobResp](README.md#queryjobresp)
* [QueryParams](README.md#queryparams)
* [QueryResultResp](README.md#queryresultresp)
* [ResultFormat](README.md#resultformat)

### Variables

* [APIEPMAP](README.md#apiepmap)
* [DEFAULT_DELAY](README.md#const-default_delay)
* [DEFAULT_PAGE_SIZE](README.md#const-default_page_size)
* [EP_QUERY](README.md#ep_query)
* [EUFQDN](README.md#const-eufqdn)
* [HTTP2_HEADER_AUTHORIZATION](README.md#http2_header_authorization)
* [HTTP2_HEADER_CONTENT_LENGTH](README.md#http2_header_content_length)
* [HTTP2_HEADER_CONTENT_TYPE](README.md#http2_header_content_type)
* [HTTP2_HEADER_METHOD](README.md#http2_header_method)
* [HTTP2_HEADER_PATH](README.md#http2_header_path)
* [HTTP2_HEADER_STATUS](README.md#http2_header_status)
* [HTTP2_METHOD_DELETE](README.md#http2_method_delete)
* [HTTP2_METHOD_GET](README.md#http2_method_get)
* [HTTP2_METHOD_POST](README.md#http2_method_post)
* [HTTP2_METHOD_PUT](README.md#http2_method_put)
* [MAX_RETRIES](README.md#const-max_retries)
* [USFQDN](README.md#const-usfqdn)
* [currentLogLevel](README.md#let-currentloglevel)
* [envLevel](README.md#const-envlevel)
* [initJobCount](README.md#let-initjobcount)
* [logFunc](README.md#const-logfunc)
* [seqno](README.md#let-seqno)

### Functions

* [commonLogger](README.md#commonlogger)
* [isJobState](README.md#isjobstate)
* [isQueryApiError](README.md#isqueryapierror)
* [isQueryJobDetail](README.md#isqueryjobdetail)
* [isQueryJobResp](README.md#isqueryjobresp)
* [isQueryParams](README.md#isqueryparams)
* [isQueryResultResp](README.md#isqueryresultresp)
* [setLogLevel](README.md#setloglevel)
* [uuid](README.md#uuid)

### Object literals

* [cortexConstants](README.md#const-cortexconstants)

## Type aliases

###  CredentialTuple

Ƭ **CredentialTuple**: *object*

*Defined in [src/http2client.ts:80](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L80)*

Credential tuple

#### Type declaration:

* **cred**: *[Credentials](interfaces/credentials.md)*

* **dlid**: *string*

* **entrypoint**: *string*

___

###  GetJobResultsOpts

Ƭ **GetJobResultsOpts**: *object*

*Defined in [src/query/query_service_models.ts:316](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L316)*

Configuration options for the Get Job Results Query API call

#### Type declaration:

* **maxWait**? : *undefined | number*

* **offset**? : *undefined | number*

* **pageCursor**? : *string | null*

* **pageNumber**? : *undefined | number*

* **pageSize**? : *undefined | number*

* **resultFormat**? : *[ResultFormat](README.md#resultformat)*

___

###  GetJobsListOpts

Ƭ **GetJobsListOpts**: *object*

*Defined in [src/query/query_service_models.ts:363](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L363)*

Configuration options for the Get Jobs List Query API call

#### Type declaration:

* **createdAfter**? : *undefined | number*

* **maxJobs**? : *undefined | number*

* **state**? : *keyof typeof jobState*

* **tenantId**: *string*

___

###  JobState

Ƭ **JobState**: *"PENDING" | "RUNNING" | "DONE" | "FAILED" | "CANCELLED"*

*Defined in [src/query/query_service_models.ts:134](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L134)*

The different states a query job can be

___

###  Query

Ƭ **Query**: *object*

*Defined in [src/query/query_service_models.ts:84](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L84)*

Interface that describes a query job

#### Type declaration:

* **jobId**? : *undefined | string*

* **params**: *[QueryParams](README.md#queryparams)*

___

###  QueryApiError

Ƭ **QueryApiError**: *object*

*Defined in [src/query/query_service_models.ts:285](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L285)*

Model of a query service error response

#### Type declaration:

* **context**? : *undefined | string*

* **errorCode**? : *undefined | number*

* **message**? : *undefined | string*

___

###  QueryJobDetail

Ƭ **QueryJobDetail**: *object*

*Defined in [src/query/query_service_models.ts:143](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L143)*

Detailed information about a query job

#### Type declaration:

* **endTime**? : *undefined | number*

* **errors**? : *object[]*

* **jobId**: *string*

* **params**? : *[QueryParams](README.md#queryparams)*

* **progress**? : *undefined | object*

* **startTime**? : *undefined | number*

* **state**: *[JobState](README.md#jobstate)*

* **statistics**? : *undefined | object*

* **submitTime**: *number*

___

###  QueryJobResp

Ƭ **QueryJobResp**: *object*

*Defined in [src/query/query_service_models.ts:99](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L99)*

Models the response provided by the Query Service

#### Type declaration:

* **jobId**: *string*

* **uri**: *string*

___

###  QueryParams

Ƭ **QueryParams**: *object*

*Defined in [src/query/query_service_models.ts:17](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L17)*

Describes mandatory and optional configuration options to perform a query job

#### Type declaration:

* **dialect**? : *undefined | string*

* **properties**? : *undefined | object*

* **query**: *string*

___

###  QueryResultResp

Ƭ **QueryResultResp**: *object*

*Defined in [src/query/query_service_models.ts:223](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L223)*

Model of a query service result response

#### Type declaration:

* **jobId**: *string*

* **page**(): *object*

  * **pageCursor**: *string | null*

  * **result**(): *object*

    * **data**: *any[]*

* **resultFormat**: *[ResultFormat](README.md#resultformat)*

* **rowsInJob**? : *undefined | number*

* **rowsInPage**? : *undefined | number*

* **schema**? : *undefined | object*

* **state**: *[JobState](README.md#jobstate)*

___

###  ResultFormat

Ƭ **ResultFormat**: *"valuesArray" | "valuesDictionary"*

*Defined in [src/query/query_service_models.ts:218](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L218)*

The different formats a job query result could have

## Variables

###  APIEPMAP

• **APIEPMAP**: *object*

*Defined in [src/http2client.ts:33](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L33)*

#### Type declaration:

* **americas**: *string* = USFQDN

* **europe**: *string* = EUFQDN

___

### `Const` DEFAULT_DELAY

• **DEFAULT_DELAY**: *200* = 200

*Defined in [src/query/query_service_client.ts:22](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L22)*

___

### `Const` DEFAULT_PAGE_SIZE

• **DEFAULT_PAGE_SIZE**: *400* = 400

*Defined in [src/query/query_service_client.ts:23](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L23)*

___

###  EP_QUERY

• **EP_QUERY**: *string*

*Defined in [src/query/query_service.ts:25](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service.ts#L25)*

___

### `Const` EUFQDN

• **EUFQDN**: *"api.nl.cdl.paloaltonetworks.com"* = "api.nl.cdl.paloaltonetworks.com"

*Defined in [src/constants.ts:14](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/constants.ts#L14)*

___

###  HTTP2_HEADER_AUTHORIZATION

• **HTTP2_HEADER_AUTHORIZATION**: *string*

*Defined in [src/http2client.ts:28](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L28)*

___

###  HTTP2_HEADER_CONTENT_LENGTH

• **HTTP2_HEADER_CONTENT_LENGTH**: *string*

*Defined in [src/http2client.ts:30](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L30)*

___

###  HTTP2_HEADER_CONTENT_TYPE

• **HTTP2_HEADER_CONTENT_TYPE**: *string*

*Defined in [src/http2client.ts:29](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L29)*

___

###  HTTP2_HEADER_METHOD

• **HTTP2_HEADER_METHOD**: *string*

*Defined in [src/http2client.ts:26](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L26)*

___

###  HTTP2_HEADER_PATH

• **HTTP2_HEADER_PATH**: *string*

*Defined in [src/http2client.ts:25](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L25)*

___

###  HTTP2_HEADER_STATUS

• **HTTP2_HEADER_STATUS**: *string*

*Defined in [src/http2client.ts:27](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L27)*

___

###  HTTP2_METHOD_DELETE

• **HTTP2_METHOD_DELETE**: *string*

*Defined in [src/http2client.ts:22](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L22)*

___

###  HTTP2_METHOD_GET

• **HTTP2_METHOD_GET**: *string*

*Defined in [src/http2client.ts:21](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L21)*

___

###  HTTP2_METHOD_POST

• **HTTP2_METHOD_POST**: *string*

*Defined in [src/http2client.ts:23](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L23)*

___

###  HTTP2_METHOD_PUT

• **HTTP2_METHOD_PUT**: *string*

*Defined in [src/http2client.ts:24](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L24)*

___

### `Const` MAX_RETRIES

• **MAX_RETRIES**: *10* = 10

*Defined in [src/query/query_service_client.ts:21](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L21)*

___

### `Const` USFQDN

• **USFQDN**: *"api.us.cdl.paloaltonetworks.com"* = "api.us.cdl.paloaltonetworks.com"

*Defined in [src/constants.ts:15](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/constants.ts#L15)*

___

### `Let` currentLogLevel

• **currentLogLevel**: *[logLevel](enums/loglevel.md)* = (isNaN(envLevel) && logLevel.INFO) || envLevel

*Defined in [src/commonlogger.ts:27](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/commonlogger.ts#L27)*

___

### `Const` envLevel

• **envLevel**: *number* = Number.parseInt(process.env['CORTEX_SDK_LOG'] || '', 10)

*Defined in [src/commonlogger.ts:26](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/commonlogger.ts#L26)*

___

### `Let` initJobCount

• **initJobCount**: *number* = Date.now()

*Defined in [src/query/query_service_client.ts:25](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L25)*

___

### `Const` logFunc

• **logFunc**: *debug[]* = [console.debug, console.info, console.warn, console.error]

*Defined in [src/commonlogger.ts:28](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/commonlogger.ts#L28)*

___

### `Let` seqno

• **seqno**: *number* = Math.floor(Math.random() * 10000)

*Defined in [src/http2client.ts:35](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L35)*

## Functions

###  commonLogger

▸ **commonLogger**(`error`: [Error](classes/sdkerror.md#static-error)): *void*

*Defined in [src/commonlogger.ts:34](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/commonlogger.ts#L34)*

logs an error object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | [Error](classes/sdkerror.md#static-error) | object to be logged  |

**Returns:** *void*

▸ **commonLogger**(`level`: [logLevel](enums/loglevel.md), `message`: string, `noPrefix?`: undefined | false | true): *void*

*Defined in [src/commonlogger.ts:41](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/commonlogger.ts#L41)*

logs a message string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`level` | [logLevel](enums/loglevel.md) | level of the message |
`message` | string | the error message |
`noPrefix?` | undefined &#124; false &#124; true | to remove the 'CORTEX_SDK' prefix in the output  |

**Returns:** *void*

___

###  isJobState

▸ **isJobState**(`obj`: any): *obj is JobState*

*Defined in [src/query/query_service_models.ts:136](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *obj is JobState*

___

###  isQueryApiError

▸ **isQueryApiError**(`obj`: any): *obj is QueryApiError*

*Defined in [src/query/query_service_models.ts:306](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L306)*

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

*Defined in [src/query/query_service_models.ts:202](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L202)*

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

*Defined in [src/query/query_service_models.ts:116](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L116)*

Convenience type guard function to check if a object conforms to the
`QueryJobResp` interface.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | object to be checked |

**Returns:** *obj is QueryJobResp*

true if the interface is satisfied

___

###  isQueryParams

▸ **isQueryParams**(`obj`: any): *obj is QueryParams*

*Defined in [src/query/query_service_models.ts:68](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *obj is QueryParams*

___

###  isQueryResultResp

▸ **isQueryResultResp**(`obj`: any): *obj is QueryResultResp*

*Defined in [src/query/query_service_models.ts:272](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L272)*

Convenienece method to check if an object conforms to the `QueryResultResp` interface

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | object to be checked |

**Returns:** *obj is QueryResultResp*

true if the interface is satisfied

___

###  setLogLevel

▸ **setLogLevel**(`level`: [logLevel](enums/loglevel.md)): *void*

*Defined in [src/commonlogger.ts:63](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/commonlogger.ts#L63)*

Change the log level of the common logger at runtime

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`level` | [logLevel](enums/loglevel.md) |   |

**Returns:** *void*

___

###  uuid

▸ **uuid**(): *string*

*Defined in [src/query/query_service_client.ts:27](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L27)*

**Returns:** *string*

## Object literals

### `Const` cortexConstants

### ▪ **cortexConstants**: *object*

*Defined in [src/constants.ts:21](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/constants.ts#L21)*

Cortex constants

###  DEV_TOKEN_PROVIDER

• **DEV_TOKEN_PROVIDER**: *string* = "https://app.developers.paloaltonetworks.com/request_token"

*Defined in [src/constants.ts:64](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/constants.ts#L64)*

URL of the Palo Alto Networks Developers Relations developer token service

###  EP_QUERY

• **EP_QUERY**: *string* = "/query/v2"

*Defined in [src/constants.ts:42](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/constants.ts#L42)*

API path for the Cortex Query Service

###  EP_SCHEMA

• **EP_SCHEMA**: *string* = "/schema/v2/schemas"

*Defined in [src/constants.ts:38](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/constants.ts#L38)*

API path for the Cortex Schema Service

###  IDP_AUTH_URL

• **IDP_AUTH_URL**: *string* = "https://identity.paloaltonetworks.com/as/authorization.oauth2"

*Defined in [src/constants.ts:60](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/constants.ts#L60)*

Identity provider URL for token operations

###  IDP_REVOKE_URL

• **IDP_REVOKE_URL**: *string* = "https://api.paloaltonetworks.com/api/oauth2/RevokeToken"

*Defined in [src/constants.ts:56](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/constants.ts#L56)*

Identity provider URL for token revoke operations

###  IDP_TOKEN_URL

• **IDP_TOKEN_URL**: *string* = "https://api.paloaltonetworks.com/api/oauth2/RequestToken"

*Defined in [src/constants.ts:52](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/constants.ts#L52)*

Identity provider URL for authentication requests

▪ **APIEPMAP**: *object*

*Defined in [src/constants.ts:25](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/constants.ts#L25)*

Map that links Cortex Data Lake regions with their corresponding FQDNs

* **americas**: *string* = USFQDN

* **europe**: *string* = EUFQDN

▪ **OAUTH2SCOPEMAP**: *object*

*Defined in [src/constants.ts:46](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/constants.ts#L46)*

OAuth2 Identity Provider scopes for the Cortex Data Lake

* **ls-read**: *string* = "logging-service:read"

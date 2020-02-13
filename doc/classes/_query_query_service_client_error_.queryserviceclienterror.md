[pan-cortex-data-lake](../README.md) › ["query/query_service_client_error"](../modules/_query_query_service_client_error_.md) › [QueryServiceClientError](_query_query_service_client_error_.queryserviceclienterror.md)

# Class: QueryServiceClientError

Error subclass provided by `QueryServiceClient` objects that allow developer
get insights on why the operation could not be completed

## Hierarchy

  ↳ [SdkError](_sdkerror_.sdkerror.md)

  ↳ **QueryServiceClientError**

## Index

### Constructors

* [constructor](_query_query_service_client_error_.queryserviceclienterror.md#constructor)

### Properties

* [errorType](_query_query_service_client_error_.queryserviceclienterror.md#errortype)
* [jobId](_query_query_service_client_error_.queryserviceclienterror.md#jobid)
* [message](_query_query_service_client_error_.queryserviceclienterror.md#message)
* [name](_query_query_service_client_error_.queryserviceclienterror.md#name)
* [stack](_query_query_service_client_error_.queryserviceclienterror.md#optional-stack)
* [status](_query_query_service_client_error_.queryserviceclienterror.md#status)

## Constructors

###  constructor

\+ **new QueryServiceClientError**(`jobId`: string, ...`params`: any[]): *[QueryServiceClientError](_query_query_service_client_error_.queryserviceclienterror.md)*

*Overrides [SdkError](_sdkerror_.sdkerror.md).[constructor](_sdkerror_.sdkerror.md#constructor)*

Defined in src/query/query_service_client_error.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`jobId` | string |
`...params` | any[] |

**Returns:** *[QueryServiceClientError](_query_query_service_client_error_.queryserviceclienterror.md)*

## Properties

###  errorType

• **errorType**: *keyof typeof ErrorTypes*

*Inherited from [SdkError](_sdkerror_.sdkerror.md).[errorType](_sdkerror_.sdkerror.md#errortype)*

Defined in src/sdkError.ts:59

___

###  jobId

• **jobId**: *string*

Defined in src/query/query_service_client_error.ts:29

Job identifier associated to the operation

___

###  message

• **message**: *string*

*Inherited from [SdkError](_sdkerror_.sdkerror.md).[message](_sdkerror_.sdkerror.md#message)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [SdkError](_sdkerror_.sdkerror.md).[name](_sdkerror_.sdkerror.md#name)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [SdkError](_sdkerror_.sdkerror.md).[stack](_sdkerror_.sdkerror.md#optional-stack)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

___

###  status

• **status**: *[JobState](../modules/_query_query_service_models_.md#jobstate)*

Defined in src/query/query_service_client_error.ts:25

State of the job when the error was thrown

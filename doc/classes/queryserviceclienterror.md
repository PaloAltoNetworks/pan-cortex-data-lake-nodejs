[pan-cortex-data-lake](../README.md) › [QueryServiceClientError](queryserviceclienterror.md)

# Class: QueryServiceClientError

Error subclass provided by `QueryServiceClient` objects that allow developer
get insights on why the operation could not be completed

## Hierarchy

  ↳ [SdkError](sdkerror.md)

  ↳ **QueryServiceClientError**

## Index

### Constructors

* [constructor](queryserviceclienterror.md#constructor)

### Properties

* [errorType](queryserviceclienterror.md#errortype)
* [jobId](queryserviceclienterror.md#jobid)
* [message](queryserviceclienterror.md#message)
* [name](queryserviceclienterror.md#name)
* [stack](queryserviceclienterror.md#optional-stack)
* [status](queryserviceclienterror.md#status)

## Constructors

###  constructor

\+ **new QueryServiceClientError**(`jobId`: string, ...`params`: any[]): *[QueryServiceClientError](queryserviceclienterror.md)*

*Overrides [SdkError](sdkerror.md).[constructor](sdkerror.md#constructor)*

*Defined in [src/query/query_service_client_error.ts:29](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/dcdea9e/src/query/query_service_client_error.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`jobId` | string |
`...params` | any[] |

**Returns:** *[QueryServiceClientError](queryserviceclienterror.md)*

## Properties

###  errorType

• **errorType**: *keyof typeof ErrorTypes*

*Inherited from [SdkError](sdkerror.md).[errorType](sdkerror.md#errortype)*

*Defined in [src/sdkError.ts:59](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/dcdea9e/src/sdkError.ts#L59)*

___

###  jobId

• **jobId**: *string*

*Defined in [src/query/query_service_client_error.ts:29](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/dcdea9e/src/query/query_service_client_error.ts#L29)*

Job identifier associated to the operation

___

###  message

• **message**: *string*

*Inherited from [SdkError](sdkerror.md).[message](sdkerror.md#message)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [SdkError](sdkerror.md).[name](sdkerror.md#name)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [SdkError](sdkerror.md).[stack](sdkerror.md#optional-stack)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

___

###  status

• **status**: *[JobState](../README.md#jobstate)*

*Defined in [src/query/query_service_client_error.ts:25](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/dcdea9e/src/query/query_service_client_error.ts#L25)*

State of the job when the error was thrown

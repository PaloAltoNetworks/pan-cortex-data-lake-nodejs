[pan-cortex-data-lake](../README.md) › ["query/query_service_error"](../modules/_query_query_service_error_.md) › [QueryServiceError](_query_query_service_error_.queryserviceerror.md)

# Class: QueryServiceError

Error subclass provided by `QueryService` objects that allow developer get
insights on why the operation could not be completed

## Hierarchy

  ↳ [SdkError](_sdkerror_.sdkerror.md)

  ↳ **QueryServiceError**

## Index

### Constructors

* [constructor](_query_query_service_error_.queryserviceerror.md#constructor)

### Properties

* [errorType](_query_query_service_error_.queryserviceerror.md#errortype)
* [errors](_query_query_service_error_.queryserviceerror.md#errors)
* [jobId](_query_query_service_error_.queryserviceerror.md#optional-jobid)
* [message](_query_query_service_error_.queryserviceerror.md#message)
* [name](_query_query_service_error_.queryserviceerror.md#name)
* [sourceError](_query_query_service_error_.queryserviceerror.md#sourceerror)
* [stack](_query_query_service_error_.queryserviceerror.md#optional-stack)
* [status](_query_query_service_error_.queryserviceerror.md#status)
* [uri](_query_query_service_error_.queryserviceerror.md#optional-uri)

## Constructors

###  constructor

\+ **new QueryServiceError**(`errorType`: keyof typeof ErrorTypes, ...`params`: any[]): *[QueryServiceError](_query_query_service_error_.queryserviceerror.md)*

*Overrides [SdkError](_sdkerror_.sdkerror.md).[constructor](_sdkerror_.sdkerror.md#constructor)*

Defined in src/query/query_service_error.ts:43

**Parameters:**

Name | Type |
------ | ------ |
`errorType` | keyof typeof ErrorTypes |
`...params` | any[] |

**Returns:** *[QueryServiceError](_query_query_service_error_.queryserviceerror.md)*

## Properties

###  errorType

• **errorType**: *keyof typeof ErrorTypes*

*Inherited from [SdkError](_sdkerror_.sdkerror.md).[errorType](_sdkerror_.sdkerror.md#errortype)*

Defined in src/sdkError.ts:59

___

###  errors

• **errors**: *[QueryApiError](../modules/_query_query_service_models_.md#queryapierror)[]*

Defined in src/query/query_service_error.ts:35

Array of errors provided by the Cortex API GW

___

### `Optional` jobId

• **jobId**? : *undefined | string*

Defined in src/query/query_service_error.ts:39

job identifier

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

###  sourceError

• **sourceError**: *[Error](_sdkerror_.sdkerror.md#static-error)*

Defined in src/query/query_service_error.ts:27

Underlying class that originated the error

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [SdkError](_sdkerror_.sdkerror.md).[stack](_sdkerror_.sdkerror.md#optional-stack)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

___

###  status

• **status**: *number*

Defined in src/query/query_service_error.ts:31

http2 status code in the response

___

### `Optional` uri

• **uri**? : *undefined | string*

Defined in src/query/query_service_error.ts:43

The called uri that triggered the error

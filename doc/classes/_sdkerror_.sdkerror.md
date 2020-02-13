[pan-cortex-data-lake](../README.md) › ["sdkError"](../modules/_sdkerror_.md) › [SdkError](_sdkerror_.sdkerror.md)

# Class: SdkError

Error subclass to provide developer with insights on why a given Cortex
operation failed

## Hierarchy

* [Error](_sdkerror_.sdkerror.md#static-error)

  ↳ **SdkError**

  ↳ [QueryServiceError](_query_query_service_error_.queryserviceerror.md)

  ↳ [QueryServiceClientError](_query_query_service_client_error_.queryserviceclienterror.md)

## Index

### Constructors

* [constructor](_sdkerror_.sdkerror.md#constructor)

### Properties

* [errorType](_sdkerror_.sdkerror.md#errortype)
* [message](_sdkerror_.sdkerror.md#message)
* [name](_sdkerror_.sdkerror.md#name)
* [stack](_sdkerror_.sdkerror.md#optional-stack)
* [Error](_sdkerror_.sdkerror.md#static-error)

## Constructors

###  constructor

\+ **new SdkError**(`errorType`: keyof typeof ErrorTypes, ...`params`: any[]): *[SdkError](_sdkerror_.sdkerror.md)*

Defined in src/sdkError.ts:59

**Parameters:**

Name | Type |
------ | ------ |
`errorType` | keyof typeof ErrorTypes |
`...params` | any[] |

**Returns:** *[SdkError](_sdkerror_.sdkerror.md)*

## Properties

###  errorType

• **errorType**: *keyof typeof ErrorTypes*

Defined in src/sdkError.ts:59

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

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:984

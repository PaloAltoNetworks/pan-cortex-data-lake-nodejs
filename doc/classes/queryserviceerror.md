[@paloaltonetworks/pan-cortex-data-lake](../README.md) › [QueryServiceError](queryserviceerror.md)

# Class: QueryServiceError

Error subclass provided by `QueryService` objects that allow developer get
insights on why the operation could not be completed

## Hierarchy

  ↳ [SdkError](sdkerror.md)

  ↳ **QueryServiceError**

## Index

### Constructors

* [constructor](queryserviceerror.md#constructor)

### Properties

* [errorType](queryserviceerror.md#errortype)
* [errors](queryserviceerror.md#errors)
* [jobId](queryserviceerror.md#optional-jobid)
* [message](queryserviceerror.md#message)
* [name](queryserviceerror.md#name)
* [sourceError](queryserviceerror.md#sourceerror)
* [stack](queryserviceerror.md#optional-stack)
* [status](queryserviceerror.md#status)
* [uri](queryserviceerror.md#optional-uri)

## Constructors

###  constructor

\+ **new QueryServiceError**(`errorType`: keyof typeof ErrorTypes, ...`params`: any[]): *[QueryServiceError](queryserviceerror.md)*

*Overrides [SdkError](sdkerror.md).[constructor](sdkerror.md#constructor)*

*Defined in [src/query/query_service_error.ts:43](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_error.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`errorType` | keyof typeof ErrorTypes |
`...params` | any[] |

**Returns:** *[QueryServiceError](queryserviceerror.md)*

## Properties

###  errorType

• **errorType**: *keyof typeof ErrorTypes*

*Inherited from [SdkError](sdkerror.md).[errorType](sdkerror.md#errortype)*

*Defined in [src/sdkError.ts:59](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/sdkError.ts#L59)*

___

###  errors

• **errors**: *[QueryApiError](../README.md#queryapierror)[]*

*Defined in [src/query/query_service_error.ts:35](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_error.ts#L35)*

Array of errors provided by the Cortex API GW

___

### `Optional` jobId

• **jobId**? : *undefined | string*

*Defined in [src/query/query_service_error.ts:39](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_error.ts#L39)*

job identifier

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

###  sourceError

• **sourceError**: *[Error](sdkerror.md#static-error)*

*Defined in [src/query/query_service_error.ts:27](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_error.ts#L27)*

Underlying class that originated the error

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [SdkError](sdkerror.md).[stack](sdkerror.md#optional-stack)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

___

###  status

• **status**: *number*

*Defined in [src/query/query_service_error.ts:31](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_error.ts#L31)*

http2 status code in the response

___

### `Optional` uri

• **uri**? : *undefined | string*

*Defined in [src/query/query_service_error.ts:43](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_error.ts#L43)*

The called uri that triggered the error

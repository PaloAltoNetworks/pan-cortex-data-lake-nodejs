[@paloaltonetworks/pan-cortex-data-lake](../README.md) / QueryServiceError

# Class: QueryServiceError

Error subclass provided by `QueryService` objects that allow developer get
insights on why the operation could not be completed

## Hierarchy

- `SdkError`

  ↳ **`QueryServiceError`**

## Table of contents

### Constructors

- [constructor](QueryServiceError.md#constructor)

### Properties

- [errorType](QueryServiceError.md#errortype)
- [errors](QueryServiceError.md#errors)
- [jobId](QueryServiceError.md#jobid)
- [message](QueryServiceError.md#message)
- [name](QueryServiceError.md#name)
- [sourceError](QueryServiceError.md#sourceerror)
- [stack](QueryServiceError.md#stack)
- [status](QueryServiceError.md#status)
- [uri](QueryServiceError.md#uri)
- [prepareStackTrace](QueryServiceError.md#preparestacktrace)
- [stackTraceLimit](QueryServiceError.md#stacktracelimit)

### Methods

- [captureStackTrace](QueryServiceError.md#capturestacktrace)

## Constructors

### constructor

• **new QueryServiceError**(`errorType`, `...params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorType` | ``"ComsError"`` \| ``"ParseError"`` \| ``"ConfigError"`` \| ``"QueryApi"`` \| ``"QueryClient"`` \| ``"SchemaApi"`` \| ``"HubClient"`` |
| `...params` | `any`[] |

#### Overrides

SdkError.constructor

#### Defined in

[src/query/query_service_error.ts:45](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_error.ts#L45)

## Properties

### errorType

• **errorType**: ``"ComsError"`` \| ``"ParseError"`` \| ``"ConfigError"`` \| ``"QueryApi"`` \| ``"QueryClient"`` \| ``"SchemaApi"`` \| ``"HubClient"``

#### Inherited from

SdkError.errorType

#### Defined in

[src/sdkError.ts:59](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/sdkError.ts#L59)

___

### errors

• **errors**: `QueryApiError`[]

Array of errors provided by the Cortex API GW

#### Defined in

[src/query/query_service_error.ts:35](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_error.ts#L35)

___

### jobId

• `Optional` **jobId**: `string`

job identifier

#### Defined in

[src/query/query_service_error.ts:39](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_error.ts#L39)

___

### message

• **message**: `string`

#### Inherited from

SdkError.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1055

___

### name

• **name**: `string`

#### Inherited from

SdkError.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1054

___

### sourceError

• **sourceError**: `Error`

Underlying class that originated the error

#### Defined in

[src/query/query_service_error.ts:27](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_error.ts#L27)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

SdkError.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1056

___

### status

• **status**: `number`

http2 status code in the response

#### Defined in

[src/query/query_service_error.ts:31](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_error.ts#L31)

___

### uri

• `Optional` **uri**: `string`

The called uri that triggered the error

#### Defined in

[src/query/query_service_error.ts:43](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_error.ts#L43)

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

SdkError.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:115

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

SdkError.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:117

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

SdkError.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:108

[@paloaltonetworks/pan-cortex-data-lake](../README.md) / QueryServiceClientError

# Class: QueryServiceClientError

Error subclass provided by `QueryServiceClient` objects that allow developer
get insights on why the operation could not be completed

## Hierarchy

- `SdkError`

  ↳ **`QueryServiceClientError`**

## Table of contents

### Constructors

- [constructor](QueryServiceClientError.md#constructor)

### Properties

- [errorType](QueryServiceClientError.md#errortype)
- [errors](QueryServiceClientError.md#errors)
- [jobId](QueryServiceClientError.md#jobid)
- [message](QueryServiceClientError.md#message)
- [name](QueryServiceClientError.md#name)
- [stack](QueryServiceClientError.md#stack)
- [status](QueryServiceClientError.md#status)
- [prepareStackTrace](QueryServiceClientError.md#preparestacktrace)
- [stackTraceLimit](QueryServiceClientError.md#stacktracelimit)

### Methods

- [captureStackTrace](QueryServiceClientError.md#capturestacktrace)
- [fromQueryJobDetails](QueryServiceClientError.md#fromqueryjobdetails)

## Constructors

### constructor

• **new QueryServiceClientError**(`jobId`, `...params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `string` |
| `...params` | `any`[] |

#### Overrides

SdkError.constructor

#### Defined in

[src/query/query_service_client_error.ts:38](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client_error.ts#L38)

## Properties

### errorType

• **errorType**: ``"ComsError"`` \| ``"ParseError"`` \| ``"ConfigError"`` \| ``"QueryApi"`` \| ``"QueryClient"`` \| ``"SchemaApi"`` \| ``"HubClient"``

#### Inherited from

SdkError.errorType

#### Defined in

[src/sdkError.ts:59](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/sdkError.ts#L59)

___

### errors

• `Optional` **errors**: { `context`: `string` ; `message`: `string`  }[]

Provides additional information in case of error

#### Defined in

[src/query/query_service_client_error.ts:33](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client_error.ts#L33)

___

### jobId

• **jobId**: `string`

Job identifier associated to the operation

#### Defined in

[src/query/query_service_client_error.ts:29](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client_error.ts#L29)

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

### stack

• `Optional` **stack**: `string`

#### Inherited from

SdkError.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1056

___

### status

• **status**: `JobState`

State of the job when the error was thrown

#### Defined in

[src/query/query_service_client_error.ts:25](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client_error.ts#L25)

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

___

### fromQueryJobDetails

▸ `Static` **fromQueryJobDetails**(`jobDetail`): [`QueryServiceClientError`](QueryServiceClientError.md)

Takes a QueryJobDetail object (assuming to be in `FAIL` state) and builds
a QueryServiceClientError from its data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jobDetail` | `QueryJobDetail` | object to take data from |

#### Returns

[`QueryServiceClientError`](QueryServiceClientError.md)

a new QueryServiceClientError object

#### Defined in

[src/query/query_service_client_error.ts:53](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client_error.ts#L53)

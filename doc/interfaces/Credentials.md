[@paloaltonetworks/pan-cortex-data-lake](../README.md) / Credentials

# Interface: Credentials

The basic methods expected from an object that provides credentials

## Table of contents

### Methods

- [getEntryPoint](Credentials.md#getentrypoint)
- [getToken](Credentials.md#gettoken)

## Methods

### getEntryPoint

▸ **getEntryPoint**(): `string`

Cortex Data Lake API fqdn (region) this token in valid for

#### Returns

`string`

#### Defined in

[src/index.ts:36](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/index.ts#L36)

___

### getToken

▸ **getToken**(`force?`): `Promise`<`undefined` \| `string`\>

Method to retrieve the token data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `force?` | `boolean` | flag to force the response to contain token data even if a refresh operation has not been performed. An undefined response can be used by the consumer to keep using its cached data. |

#### Returns

`Promise`<`undefined` \| `string`\>

credential data either if the `force` flag was set of a refresh
operation produced new credential material.

#### Defined in

[src/index.ts:32](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/index.ts#L32)

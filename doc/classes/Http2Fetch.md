[@paloaltonetworks/pan-cortex-data-lake](../README.md) / Http2Fetch

# Class: Http2Fetch

Class that implements a HTTP2 fetch object

## Table of contents

### Constructors

- [constructor](Http2Fetch.md#constructor)

### Methods

- [close](Http2Fetch.md#close)
- [delete](Http2Fetch.md#delete)
- [get](Http2Fetch.md#get)
- [init](Http2Fetch.md#init)
- [post](Http2Fetch.md#post)
- [put](Http2Fetch.md#put)

## Constructors

### constructor

• **new Http2Fetch**(`opts?`)

Instantiates a new `Http2Fetch` object from provided configuration
options. You must provide, at least, `cortexBaseFqdn` or `cortexDefCredentials`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts?` | `Http2FetchOpts` | configuration options for this object |

#### Defined in

[src/http2client.ts:117](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L117)

## Methods

### close

▸ **close**(`entryPoint?`): `Promise`<`void`\>

Attemps to close the underlying session (if any)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entryPoint?` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/http2client.ts:251](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L251)

___

### delete

▸ **delete**(`path`, `opts?`, `cred?`): `Promise`<{ `data`: `any` ; `status`: `number`  }\>

Execute a HTTP2 DELETE operation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | relative path of the endpoint to consume |
| `opts?` | `ClientSessionRequestOptions` | options for the HTTP2 request |
| `cred?` | [`CredentialTuple`](../README.md#credentialtuple) | optional `Credentials` object for this call to override default one |

#### Returns

`Promise`<{ `data`: `any` ; `status`: `number`  }\>

the response data and status code value

#### Defined in

[src/http2client.ts:378](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L378)

___

### get

▸ **get**(`path`, `opts?`, `cred?`): `Promise`<{ `data`: `any` ; `status`: `number`  }\>

Execute a HTTP2 GET operation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | relative path of the endpoint to consume |
| `opts?` | `ClientSessionRequestOptions` | options for the HTTP2 request |
| `cred?` | [`CredentialTuple`](../README.md#credentialtuple) | optional `Credentials` object for this call to override default one |

#### Returns

`Promise`<{ `data`: `any` ; `status`: `number`  }\>

the response data and status code value

#### Defined in

[src/http2client.ts:367](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L367)

___

### init

▸ **init**(`c?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `c?` | [`CredentialTuple`](../README.md#credentialtuple) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/http2client.ts:128](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L128)

___

### post

▸ **post**(`path`, `body`, `contentType?`, `opts?`, `cred?`): `Promise`<{ `data`: `any` ; `status`: `number`  }\>

Execute a HTTP2 POST operation

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string` | `undefined` | relative path of the endpoint to consume |
| `body` | `any` | `undefined` | body content to be send |
| `contentType` | `string` | `'application/json'` | - |
| `opts?` | `ClientSessionRequestOptions` | `undefined` | options for the HTTP2 request |
| `cred?` | [`CredentialTuple`](../README.md#credentialtuple) | `undefined` | optional `Credentials` object for this call to override default one |

#### Returns

`Promise`<{ `data`: `any` ; `status`: `number`  }\>

the response data and status code value

#### Defined in

[src/http2client.ts:390](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L390)

___

### put

▸ **put**(`path`, `body`, `contentType?`, `opts?`, `cred?`): `Promise`<{ `data`: `any` ; `status`: `number`  }\>

Execute a HTTP2 PUT operation

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string` | `undefined` | relative path of the endpoint to consume |
| `body` | `any` | `undefined` | body content to be send |
| `contentType` | `string` | `'application/json'` | - |
| `opts?` | `ClientSessionRequestOptions` | `undefined` | options for the HTTP2 request |
| `cred?` | [`CredentialTuple`](../README.md#credentialtuple) | `undefined` | optional `Credentials` object for this call to override default one |

#### Returns

`Promise`<{ `data`: `any` ; `status`: `number`  }\>

the response data and status code value

#### Defined in

[src/http2client.ts:402](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L402)

[@paloaltonetworks/pan-cortex-data-lake](../README.md) › [Http2Fetch](http2fetch.md)

# Class: Http2Fetch

Class that implements a HTTP2 fetch object

## Hierarchy

* **Http2Fetch**

## Index

### Constructors

* [constructor](http2fetch.md#constructor)

### Methods

* [close](http2fetch.md#close)
* [delete](http2fetch.md#delete)
* [get](http2fetch.md#get)
* [init](http2fetch.md#init)
* [post](http2fetch.md#post)
* [put](http2fetch.md#put)

## Constructors

###  constructor

\+ **new Http2Fetch**(`opts?`: [Http2FetchOpts](../interfaces/http2fetchopts.md)): *[Http2Fetch](http2fetch.md)*

Defined in src/http2client.ts:103

Instantiates a new `Http2Fetch` object from provided configuration
options. You must provide, at least, `cortexBaseFqdn` or `cortexDefCredentials`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opts?` | [Http2FetchOpts](../interfaces/http2fetchopts.md) | configuration options for this object |

**Returns:** *[Http2Fetch](http2fetch.md)*

an instantiated `Http2Fetch` object

## Methods

###  close

▸ **close**(`entryPoint?`: undefined | string): *Promise‹void›*

Defined in src/http2client.ts:240

Attemps to close the underlying session (if any)

**Parameters:**

Name | Type |
------ | ------ |
`entryPoint?` | undefined &#124; string |

**Returns:** *Promise‹void›*

___

###  delete

▸ **delete**(`path`: string, `opts?`: http2.ClientSessionRequestOptions, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹object›*

Defined in src/http2client.ts:367

Execute a HTTP2 DELETE operation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`path` | string | relative path of the endpoint to consume |
`opts?` | http2.ClientSessionRequestOptions | options for the HTTP2 request |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional `Credentials` object for this call to override default one |

**Returns:** *Promise‹object›*

the response data and status code value

___

###  get

▸ **get**(`path`: string, `opts?`: http2.ClientSessionRequestOptions, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹object›*

Defined in src/http2client.ts:356

Execute a HTTP2 GET operation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`path` | string | relative path of the endpoint to consume |
`opts?` | http2.ClientSessionRequestOptions | options for the HTTP2 request |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional `Credentials` object for this call to override default one |

**Returns:** *Promise‹object›*

the response data and status code value

___

###  init

▸ **init**(`c?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹void›*

Defined in src/http2client.ts:121

**Parameters:**

Name | Type |
------ | ------ |
`c?` | [CredentialTuple](../README.md#credentialtuple) |

**Returns:** *Promise‹void›*

___

###  post

▸ **post**(`path`: string, `body`: any, `contentType`: string, `opts?`: http2.ClientSessionRequestOptions, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹object›*

Defined in src/http2client.ts:379

Execute a HTTP2 POST operation

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`path` | string | - | relative path of the endpoint to consume |
`body` | any | - | body content to be send |
`contentType` | string | "application/json" | - |
`opts?` | http2.ClientSessionRequestOptions | - | options for the HTTP2 request |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | - | optional `Credentials` object for this call to override default one |

**Returns:** *Promise‹object›*

the response data and status code value

___

###  put

▸ **put**(`path`: string, `body`: any, `contentType`: string, `opts?`: http2.ClientSessionRequestOptions, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹object›*

Defined in src/http2client.ts:391

Execute a HTTP2 PUT operation

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`path` | string | - | relative path of the endpoint to consume |
`body` | any | - | body content to be send |
`contentType` | string | "application/json" | - |
`opts?` | http2.ClientSessionRequestOptions | - | options for the HTTP2 request |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | - | optional `Credentials` object for this call to override default one |

**Returns:** *Promise‹object›*

the response data and status code value

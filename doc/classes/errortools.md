[@paloaltonetworks/pan-cortex-data-lake](../README.md) › [ErrorTools](errortools.md)

# Class: ErrorTools <**P**>

Convenience class to rety operations that could fail. The type `<P>`
describes the class type that would be thrown (if needed)

## Type parameters

▪ **P**: *[Error](sdkerror.md#static-error)*

## Hierarchy

* **ErrorTools**

## Index

### Constructors

* [constructor](errortools.md#constructor)

### Methods

* [retrier](errortools.md#retrier)
* [tryAsyncOp](errortools.md#tryasyncop)
* [tryDelete](errortools.md#trydelete)
* [tryGet](errortools.md#tryget)
* [tryOp](errortools.md#tryop)
* [tryPost](errortools.md#trypost)
* [tryPut](errortools.md#tryput)

## Constructors

###  constructor

\+ **new ErrorTools**(`errClass`: object): *[ErrorTools](errortools.md)*

*Defined in [src/http2client.ts:412](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L412)*

Builds an `ErrorTools` object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`errClass` | object | error class constructor that should be used if something needs to be thrown  |

**Returns:** *[ErrorTools](errortools.md)*

## Methods

###  retrier

▸ **retrier**<**T**, **O**>(`errorType`: keyof typeof ErrorTypes, `n`: number, `delay`: number, `op`: function, ...`params`: T[]): *Promise‹O›*

*Defined in [src/http2client.ts:532](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L532)*

Generic retrier method that attemps to execute a function that returns a
response of type `<O>` provided an arrays of arguments of type `<T>`

**Type parameters:**

▪ **T**

▪ **O**

**Parameters:**

▪ **errorType**: *keyof typeof ErrorTypes*

The type of the error that will be thrown in case of failure

▪`Default value`  **n**: *number*= 3

amount of times to attempt the operation (defaults to 3)

▪`Default value`  **delay**: *number*= 100

amounts of milliseconds to delay between attempts (defaults
to 100)

▪ **op**: *function*

function to be called

▸ (...`args`: T[]): *Promise‹O›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | T[] |

▪... **params**: *T[]*

arguments to be passed to the previous function

**Returns:** *Promise‹O›*

a Promise with the result of the called function

___

###  tryAsyncOp

▸ **tryAsyncOp**<**T**, **U**>(`errorType`: keyof typeof ErrorTypes, `op`: function, ...`params`: U): *Promise‹T›*

*Defined in [src/http2client.ts:447](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L447)*

Attempt an async operation that returns an object of type `<T>` and that
consumes arguments of type `...<U>[]`

**Type parameters:**

▪ **T**

▪ **U**: *any[]*

**Parameters:**

▪ **errorType**: *keyof typeof ErrorTypes*

The type of the error that will be thrown in case of failure

▪ **op**: *function*

function to call

▸ (...`params`: U): *Promise‹T›*

**Parameters:**

Name | Type |
------ | ------ |
`...params` | U |

▪... **params**: *U*

arguments to pass to the previous function

**Returns:** *Promise‹T›*

a promise with the response provided by the function

___

###  tryDelete

▸ **tryDelete**(`errorType`: keyof typeof ErrorTypes, `client`: [Http2Fetch](http2fetch.md), `path`: string, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹object›*

*Defined in [src/http2client.ts:513](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L513)*

Attempt a HTTP2 DELETE operation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`errorType` | keyof typeof ErrorTypes | The type of the error that will be thrown in case of failure |
`client` | [Http2Fetch](http2fetch.md) | `Http2Fetch` object to leverage for this operation |
`path` | string | relative path of the endpoint to consume |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional `Credentials` object for this call to override default one |

**Returns:** *Promise‹object›*

the response data and status code value

___

###  tryGet

▸ **tryGet**(`errorType`: keyof typeof ErrorTypes, `client`: [Http2Fetch](http2fetch.md), `path`: string, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹object›*

*Defined in [src/http2client.ts:497](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L497)*

Attempt a HTTP2 GET operation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`errorType` | keyof typeof ErrorTypes | The type of the error that will be thrown in case of failure |
`client` | [Http2Fetch](http2fetch.md) | `Http2Fetch` object to leverage for this operation |
`path` | string | relative path of the endpoint to consume |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional `Credentials` object for this call to override default one |

**Returns:** *Promise‹object›*

the response data and status code value

___

###  tryOp

▸ **tryOp**<**T**, **U**>(`errorType`: keyof typeof ErrorTypes, `op`: function, ...`params`: U): *T*

*Defined in [src/http2client.ts:431](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L431)*

Attempt an operation that returns an object of type `<T>` and that
consumes arguments of type `...<U>[]`

**Type parameters:**

▪ **T**

▪ **U**: *any[]*

**Parameters:**

▪ **errorType**: *keyof typeof ErrorTypes*

The type of the error that will be thrown in case of failure

▪ **op**: *function*

function to call

▸ (...`params`: U): *T*

**Parameters:**

Name | Type |
------ | ------ |
`...params` | U |

▪... **params**: *U*

arguments to pass to the previous function

**Returns:** *T*

the response provided by the function

___

###  tryPost

▸ **tryPost**(`errorType`: keyof typeof ErrorTypes, `client`: [Http2Fetch](http2fetch.md), `path`: string, `body`: any, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹object›*

*Defined in [src/http2client.ts:464](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L464)*

Attempt a HTTP2 POST operation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`errorType` | keyof typeof ErrorTypes | The type of the error that will be thrown in case of failure |
`client` | [Http2Fetch](http2fetch.md) | `Http2Fetch` object to leverage for this operation |
`path` | string | relative path of the endpoint to consume |
`body` | any | body content to be send |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional `Credentials` object for this call to override default one |

**Returns:** *Promise‹object›*

the response data and status code value

___

###  tryPut

▸ **tryPut**(`errorType`: keyof typeof ErrorTypes, `client`: [Http2Fetch](http2fetch.md), `path`: string, `body`: any, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *Promise‹object›*

*Defined in [src/http2client.ts:481](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L481)*

Attempt a HTTP2 PUT operation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`errorType` | keyof typeof ErrorTypes | The type of the error that will be thrown in case of failure |
`client` | [Http2Fetch](http2fetch.md) | `Http2Fetch` object to leverage for this operation |
`path` | string | relative path of the endpoint to consume |
`body` | any | body content to be send |
`cred?` | [CredentialTuple](../README.md#credentialtuple) | optional `Credentials` object for this call to override default one |

**Returns:** *Promise‹object›*

the response data and status code value

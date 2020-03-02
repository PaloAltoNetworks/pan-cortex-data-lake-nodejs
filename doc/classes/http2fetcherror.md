[@paloaltonetworks/pan-cortex-data-lake](../README.md) › [Http2FetchError](http2fetcherror.md)

# Class: Http2FetchError

Error subclass that allows the developer get insights on reasons for a HTTP2 error

## Hierarchy

* [Error](sdkerror.md#static-error)

  ↳ **Http2FetchError**

## Index

### Constructors

* [constructor](http2fetcherror.md#constructor)

### Properties

* [data](http2fetcherror.md#data)
* [message](http2fetcherror.md#message)
* [name](http2fetcherror.md#name)
* [stack](http2fetcherror.md#optional-stack)
* [status](http2fetcherror.md#status)
* [Error](http2fetcherror.md#static-error)

## Constructors

###  constructor

\+ **new Http2FetchError**(`message`: string, `status`: number, `data`: any): *[Http2FetchError](http2fetcherror.md)*

*Defined in [src/http2client.ts:48](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`status` | number |
`data` | any |

**Returns:** *[Http2FetchError](http2fetcherror.md)*

## Properties

###  data

• **data**: *any*

*Defined in [src/http2client.ts:48](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L48)*

Body of the HTTP2 response that triggered the errror

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

• **status**: *number*

*Defined in [src/http2client.ts:44](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L44)*

Value of the HTTP2 status header that triggered the error

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:984

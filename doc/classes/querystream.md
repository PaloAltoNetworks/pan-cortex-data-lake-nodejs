[@paloaltonetworks/pan-cortex-data-lake](../README.md) › [QueryStream](querystream.md)

# Class: QueryStream

## Hierarchy

* Readable

  ↳ **QueryStream**

## Implements

* ReadableStream

## Index

### Constructors

* [constructor](querystream.md#constructor)

### Properties

* [destroyed](querystream.md#destroyed)
* [readable](querystream.md#readable)
* [readableHighWaterMark](querystream.md#readablehighwatermark)
* [readableLength](querystream.md#readablelength)
* [readableObjectMode](querystream.md#readableobjectmode)

### Methods

* [[Symbol.asyncIterator]](querystream.md#[symbol.asynciterator])
* [_destroy](querystream.md#_destroy)
* [_read](querystream.md#_read)
* [addListener](querystream.md#addlistener)
* [destroy](querystream.md#destroy)
* [emit](querystream.md#emit)
* [eventNames](querystream.md#eventnames)
* [getMaxListeners](querystream.md#getmaxlisteners)
* [isPaused](querystream.md#ispaused)
* [listenerCount](querystream.md#listenercount)
* [listeners](querystream.md#listeners)
* [off](querystream.md#off)
* [on](querystream.md#on)
* [once](querystream.md#once)
* [pause](querystream.md#pause)
* [pipe](querystream.md#pipe)
* [prependListener](querystream.md#prependlistener)
* [prependOnceListener](querystream.md#prependoncelistener)
* [push](querystream.md#push)
* [rawListeners](querystream.md#rawlisteners)
* [read](querystream.md#read)
* [removeAllListeners](querystream.md#removealllisteners)
* [removeListener](querystream.md#removelistener)
* [resume](querystream.md#resume)
* [setEncoding](querystream.md#setencoding)
* [setMaxListeners](querystream.md#setmaxlisteners)
* [unpipe](querystream.md#unpipe)
* [unshift](querystream.md#unshift)
* [wrap](querystream.md#wrap)
* [from](querystream.md#static-from)

## Constructors

###  constructor

\+ **new QueryStream**(`sqlCommand`: string, `qsc`: [QueryServiceClient](queryserviceclient.md), `opts?`: ReadableOptions, `cred?`: [CredentialTuple](../README.md#credentialtuple)): *[QueryStream](querystream.md)*

*Overrides void*

*Defined in [src/query/query_service_client.ts:152](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L152)*

**Parameters:**

Name | Type |
------ | ------ |
`sqlCommand` | string |
`qsc` | [QueryServiceClient](queryserviceclient.md) |
`opts?` | ReadableOptions |
`cred?` | [CredentialTuple](../README.md#credentialtuple) |

**Returns:** *[QueryStream](querystream.md)*

## Properties

###  destroyed

• **destroyed**: *boolean*

*Inherited from [QueryStream](querystream.md).[destroyed](querystream.md#destroyed)*

Defined in node_modules/@types/node/stream.d.ts:32

___

###  readable

• **readable**: *boolean*

*Inherited from [QueryStream](querystream.md).[readable](querystream.md#readable)*

Defined in node_modules/@types/node/stream.d.ts:28

___

###  readableHighWaterMark

• **readableHighWaterMark**: *number*

*Inherited from [QueryStream](querystream.md).[readableHighWaterMark](querystream.md#readablehighwatermark)*

Defined in node_modules/@types/node/stream.d.ts:29

___

###  readableLength

• **readableLength**: *number*

*Inherited from [QueryStream](querystream.md).[readableLength](querystream.md#readablelength)*

Defined in node_modules/@types/node/stream.d.ts:30

___

###  readableObjectMode

• **readableObjectMode**: *boolean*

*Inherited from [QueryStream](querystream.md).[readableObjectMode](querystream.md#readableobjectmode)*

Defined in node_modules/@types/node/stream.d.ts:31

## Methods

###  [Symbol.asyncIterator]

▸ **[Symbol.asyncIterator]**(): *AsyncIterableIterator‹any›*

*Inherited from [QueryStream](querystream.md).[[Symbol.asyncIterator]](querystream.md#[symbol.asynciterator])*

Defined in node_modules/@types/node/stream.d.ts:105

**Returns:** *AsyncIterableIterator‹any›*

___

###  _destroy

▸ **_destroy**(`error`: [Error](sdkerror.md#static-error) | null, `callback`: function): *void*

*Overrides void*

*Defined in [src/query/query_service_client.ts:173](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L173)*

**Parameters:**

▪ **error**: *[Error](sdkerror.md#static-error) | null*

▪ **callback**: *function*

▸ (`error?`: [Error](sdkerror.md#static-error) | null): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error?` | [Error](sdkerror.md#static-error) &#124; null |

**Returns:** *void*

___

###  _read

▸ **_read**(): *void*

*Overrides void*

*Defined in [src/query/query_service_client.ts:160](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L160)*

**Returns:** *void*

___

###  addListener

▸ **addListener**(`event`: "close", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[addListener](querystream.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:56

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. readable
5. error

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "data", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[addListener](querystream.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:57

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **addListener**(`event`: "end", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[addListener](querystream.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:58

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "readable", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[addListener](querystream.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:59

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "error", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[addListener](querystream.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:60

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: [Error](sdkerror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](sdkerror.md#static-error) |

**Returns:** *this*

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[addListener](querystream.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:61

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  destroy

▸ **destroy**(`error?`: [Error](sdkerror.md#static-error)): *void*

*Inherited from [QueryStream](querystream.md).[destroy](querystream.md#destroy)*

Defined in node_modules/@types/node/stream.d.ts:45

**Parameters:**

Name | Type |
------ | ------ |
`error?` | [Error](sdkerror.md#static-error) |

**Returns:** *void*

___

###  emit

▸ **emit**(`event`: "close"): *boolean*

*Inherited from [QueryStream](querystream.md).[emit](querystream.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:63

**Parameters:**

Name | Type |
------ | ------ |
`event` | "close" |

**Returns:** *boolean*

▸ **emit**(`event`: "data", `chunk`: any): *boolean*

*Inherited from [QueryStream](querystream.md).[emit](querystream.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:64

**Parameters:**

Name | Type |
------ | ------ |
`event` | "data" |
`chunk` | any |

**Returns:** *boolean*

▸ **emit**(`event`: "end"): *boolean*

*Inherited from [QueryStream](querystream.md).[emit](querystream.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:65

**Parameters:**

Name | Type |
------ | ------ |
`event` | "end" |

**Returns:** *boolean*

▸ **emit**(`event`: "readable"): *boolean*

*Inherited from [QueryStream](querystream.md).[emit](querystream.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:66

**Parameters:**

Name | Type |
------ | ------ |
`event` | "readable" |

**Returns:** *boolean*

▸ **emit**(`event`: "error", `err`: [Error](sdkerror.md#static-error)): *boolean*

*Inherited from [QueryStream](querystream.md).[emit](querystream.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:67

**Parameters:**

Name | Type |
------ | ------ |
`event` | "error" |
`err` | [Error](sdkerror.md#static-error) |

**Returns:** *boolean*

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from [QueryStream](querystream.md).[emit](querystream.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:68

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from [QueryStream](querystream.md).[eventNames](querystream.md#eventnames)*

Defined in node_modules/@types/node/globals.d.ts:556

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from [QueryStream](querystream.md).[getMaxListeners](querystream.md#getmaxlisteners)*

Defined in node_modules/@types/node/globals.d.ts:548

**Returns:** *number*

___

###  isPaused

▸ **isPaused**(): *boolean*

*Inherited from [QueryStream](querystream.md).[isPaused](querystream.md#ispaused)*

Defined in node_modules/@types/node/stream.d.ts:39

**Returns:** *boolean*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from [QueryStream](querystream.md).[listenerCount](querystream.md#listenercount)*

Defined in node_modules/@types/node/globals.d.ts:552

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from [QueryStream](querystream.md).[listeners](querystream.md#listeners)*

Defined in node_modules/@types/node/globals.d.ts:549

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[off](querystream.md#off)*

Defined in node_modules/@types/node/globals.d.ts:545

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: "close", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[on](querystream.md#on)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:70

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "data", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[on](querystream.md#on)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:71

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **on**(`event`: "end", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[on](querystream.md#on)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:72

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "readable", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[on](querystream.md#on)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:73

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "error", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[on](querystream.md#on)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:74

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: [Error](sdkerror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](sdkerror.md#static-error) |

**Returns:** *this*

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[on](querystream.md#on)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:75

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  once

▸ **once**(`event`: "close", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[once](querystream.md#once)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:77

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "data", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[once](querystream.md#once)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:78

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **once**(`event`: "end", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[once](querystream.md#once)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:79

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "readable", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[once](querystream.md#once)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:80

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "error", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[once](querystream.md#once)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:81

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: [Error](sdkerror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](sdkerror.md#static-error) |

**Returns:** *this*

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[once](querystream.md#once)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:82

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  pause

▸ **pause**(): *this*

*Inherited from [QueryStream](querystream.md).[pause](querystream.md#pause)*

Defined in node_modules/@types/node/stream.d.ts:37

**Returns:** *this*

___

###  pipe

▸ **pipe**<**T**>(`destination`: T, `options?`: undefined | object): *T*

*Inherited from [QueryStream](querystream.md).[pipe](querystream.md#pipe)*

Defined in node_modules/@types/node/stream.d.ts:5

**Type parameters:**

▪ **T**: *WritableStream*

**Parameters:**

Name | Type |
------ | ------ |
`destination` | T |
`options?` | undefined &#124; object |

**Returns:** *T*

___

###  prependListener

▸ **prependListener**(`event`: "close", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[prependListener](querystream.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:84

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "data", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[prependListener](querystream.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:85

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **prependListener**(`event`: "end", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[prependListener](querystream.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:86

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "readable", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[prependListener](querystream.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:87

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "error", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[prependListener](querystream.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:88

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: [Error](sdkerror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](sdkerror.md#static-error) |

**Returns:** *this*

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[prependListener](querystream.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:89

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: "close", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[prependOnceListener](querystream.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:91

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "data", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[prependOnceListener](querystream.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:92

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **prependOnceListener**(`event`: "end", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[prependOnceListener](querystream.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:93

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "readable", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[prependOnceListener](querystream.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:94

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "error", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[prependOnceListener](querystream.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:95

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: [Error](sdkerror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](sdkerror.md#static-error) |

**Returns:** *this*

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[prependOnceListener](querystream.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:96

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  push

▸ **push**(`chunk`: any, `encoding?`: undefined | string): *boolean*

*Inherited from [QueryStream](querystream.md).[push](querystream.md#push)*

Defined in node_modules/@types/node/stream.d.ts:43

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |
`encoding?` | undefined &#124; string |

**Returns:** *boolean*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from [QueryStream](querystream.md).[rawListeners](querystream.md#rawlisteners)*

Defined in node_modules/@types/node/globals.d.ts:550

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  read

▸ **read**(`size?`: undefined | number): *any*

*Inherited from [QueryStream](querystream.md).[read](querystream.md#read)*

Defined in node_modules/@types/node/stream.d.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`size?` | undefined &#124; number |

**Returns:** *any*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from [QueryStream](querystream.md).[removeAllListeners](querystream.md#removealllisteners)*

Defined in node_modules/@types/node/globals.d.ts:546

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: "close", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[removeListener](querystream.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:98

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "data", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[removeListener](querystream.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:99

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **removeListener**(`event`: "end", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[removeListener](querystream.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:100

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "readable", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[removeListener](querystream.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:101

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "error", `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[removeListener](querystream.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:102

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: [Error](sdkerror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](sdkerror.md#static-error) |

**Returns:** *this*

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [QueryStream](querystream.md).[removeListener](querystream.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/stream.d.ts:103

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  resume

▸ **resume**(): *this*

*Inherited from [QueryStream](querystream.md).[resume](querystream.md#resume)*

Defined in node_modules/@types/node/stream.d.ts:38

**Returns:** *this*

___

###  setEncoding

▸ **setEncoding**(`encoding`: string): *this*

*Inherited from [QueryStream](querystream.md).[setEncoding](querystream.md#setencoding)*

Defined in node_modules/@types/node/stream.d.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | string |

**Returns:** *this*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from [QueryStream](querystream.md).[setMaxListeners](querystream.md#setmaxlisteners)*

Defined in node_modules/@types/node/globals.d.ts:547

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

###  unpipe

▸ **unpipe**(`destination?`: NodeJS.WritableStream): *this*

*Inherited from [QueryStream](querystream.md).[unpipe](querystream.md#unpipe)*

Defined in node_modules/@types/node/stream.d.ts:40

**Parameters:**

Name | Type |
------ | ------ |
`destination?` | NodeJS.WritableStream |

**Returns:** *this*

___

###  unshift

▸ **unshift**(`chunk`: any, `encoding?`: BufferEncoding): *void*

*Inherited from [QueryStream](querystream.md).[unshift](querystream.md#unshift)*

Defined in node_modules/@types/node/stream.d.ts:41

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |
`encoding?` | BufferEncoding |

**Returns:** *void*

___

###  wrap

▸ **wrap**(`oldStream`: ReadableStream): *this*

*Inherited from [QueryStream](querystream.md).[wrap](querystream.md#wrap)*

Defined in node_modules/@types/node/stream.d.ts:42

**Parameters:**

Name | Type |
------ | ------ |
`oldStream` | ReadableStream |

**Returns:** *this*

___

### `Static` from

▸ **from**(`iterable`: Iterable‹any› | AsyncIterable‹any›, `options?`: ReadableOptions): *Readable*

*Inherited from [QueryStream](querystream.md).[from](querystream.md#static-from)*

Defined in node_modules/@types/node/stream.d.ts:26

A utility method for creating Readable Streams out of iterators.

**Parameters:**

Name | Type |
------ | ------ |
`iterable` | Iterable‹any› &#124; AsyncIterable‹any› |
`options?` | ReadableOptions |

**Returns:** *Readable*

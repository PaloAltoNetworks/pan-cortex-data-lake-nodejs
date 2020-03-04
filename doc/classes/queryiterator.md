[@paloaltonetworks/pan-cortex-data-lake](../README.md) › [QueryIterator](queryiterator.md)

# Class: QueryIterator

## Hierarchy

* **QueryIterator**

## Implements

* AsyncIterableIterator‹any›

## Index

### Constructors

* [constructor](queryiterator.md#constructor)

### Properties

* [cred](queryiterator.md#optional-cred)

### Methods

* [[Symbol.asyncIterator]](queryiterator.md#[symbol.asynciterator])
* [next](queryiterator.md#next)
* [return](queryiterator.md#return)

## Constructors

###  constructor

\+ **new QueryIterator**(`sqlCommand`: string, `qsc`: [QueryServiceClient](queryserviceclient.md), `cred?`: [CredentialTuple](../README.md#credentialtuple)): *[QueryIterator](queryiterator.md)*

*Defined in [src/query/query_service_client.ts:91](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`sqlCommand` | string |
`qsc` | [QueryServiceClient](queryserviceclient.md) |
`cred?` | [CredentialTuple](../README.md#credentialtuple) |

**Returns:** *[QueryIterator](queryiterator.md)*

## Properties

### `Optional` cred

• **cred**? : *[CredentialTuple](../README.md#credentialtuple)*

*Defined in [src/query/query_service_client.ts:91](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L91)*

## Methods

###  [Symbol.asyncIterator]

▸ **[Symbol.asyncIterator]**(): *AsyncIterableIterator‹any›*

*Defined in [src/query/query_service_client.ts:98](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L98)*

**Returns:** *AsyncIterableIterator‹any›*

___

###  next

▸ **next**(): *Promise‹IteratorResult‹any››*

*Defined in [src/query/query_service_client.ts:102](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L102)*

**Returns:** *Promise‹IteratorResult‹any››*

___

###  return

▸ **return**(): *Promise‹IteratorResult‹any››*

*Defined in [src/query/query_service_client.ts:122](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L122)*

**Returns:** *Promise‹IteratorResult‹any››*

[@paloaltonetworks/pan-cortex-data-lake](../README.md) › [QueryWorker](queryworker.md)

# Class: QueryWorker

## Hierarchy

* **QueryWorker**

## Index

### Constructors

* [constructor](queryworker.md#constructor)

### Properties

* [cred](queryworker.md#optional-cred)
* [deleteJob](queryworker.md#deletejob)
* [jobId](queryworker.md#jobid)
* [pageCursor](queryworker.md#pagecursor)
* [qsc](queryworker.md#qsc)
* [results](queryworker.md#results)

### Methods

* [lazyInit](queryworker.md#lazyinit)
* [loadPage](queryworker.md#loadpage)

## Constructors

###  constructor

\+ **new QueryWorker**(`sqlCommand`: string, `qsc`: [QueryServiceClient](queryserviceclient.md), `cred?`: [CredentialTuple](../README.md#credentialtuple)): *[QueryWorker](queryworker.md)*

Defined in src/query/query_service_client.ts:43

**Parameters:**

Name | Type |
------ | ------ |
`sqlCommand` | string |
`qsc` | [QueryServiceClient](queryserviceclient.md) |
`cred?` | [CredentialTuple](../README.md#credentialtuple) |

**Returns:** *[QueryWorker](queryworker.md)*

## Properties

### `Optional` cred

• **cred**? : *[CredentialTuple](../README.md#credentialtuple)*

Defined in src/query/query_service_client.ts:41

___

###  deleteJob

• **deleteJob**: *function*

Defined in src/query/query_service_client.ts:38

#### Type declaration:

▸ (`jobId`: string, `cred?`: [CredentialTuple](../README.md#credentialtuple) | undefined): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`jobId` | string |
`cred?` | [CredentialTuple](../README.md#credentialtuple) &#124; undefined |

___

###  jobId

• **jobId**: *null | string* = null as string | null

Defined in src/query/query_service_client.ts:39

___

###  pageCursor

• **pageCursor**: *null | string* = null as string | null

Defined in src/query/query_service_client.ts:42

___

###  qsc

• **qsc**: *[QueryServiceClient](queryserviceclient.md)*

Defined in src/query/query_service_client.ts:40

___

###  results

• **results**: *null | any[]* = null as any[] | null

Defined in src/query/query_service_client.ts:43

## Methods

###  lazyInit

▸ **lazyInit**(): *Promise‹void›*

Defined in src/query/query_service_client.ts:65

**Returns:** *Promise‹void›*

___

###  loadPage

▸ **loadPage**(): *Promise‹void›*

Defined in src/query/query_service_client.ts:55

**Returns:** *Promise‹void›*

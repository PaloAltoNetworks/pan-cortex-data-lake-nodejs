[pan-cortex-data-lake](../README.md) › ["index"](../modules/_index_.md) › [Credentials](_index_.credentials.md)

# Interface: Credentials

The basic methods expected from an object that provides credentials

## Hierarchy

* **Credentials**

## Index

### Methods

* [getEntryPoint](_index_.credentials.md#getentrypoint)
* [getToken](_index_.credentials.md#gettoken)

## Methods

###  getEntryPoint

▸ **getEntryPoint**(): *string*

Defined in src/index.ts:44

Cortex Data Lake API fqdn (region) this token in valid for

**Returns:** *string*

___

###  getToken

▸ **getToken**(`force?`: undefined | false | true): *Promise‹string | undefined›*

Defined in src/index.ts:40

Method to retrieve the token data

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`force?` | undefined &#124; false &#124; true | flag to force the response to contain token data even if a refresh operation has not been performed. An undefined response can be used by the consumer to keep using its cached data. |

**Returns:** *Promise‹string | undefined›*

credential data either if the `force` flag was set of a refresh
operation produced new credential material.

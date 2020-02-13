[pan-cortex-data-lake](../README.md) › [QueryServiceClientOptions](queryserviceclientoptions.md)

# Interface: QueryServiceClientOptions

Configuration options for the QueryServiceClient object

## Hierarchy

* **QueryServiceClientOptions**

## Index

### Properties

* [autoClose](queryserviceclientoptions.md#optional-autoclose)
* [cred](queryserviceclientoptions.md#optional-cred)
* [delay](queryserviceclientoptions.md#optional-delay)
* [pageSize](queryserviceclientoptions.md#optional-pagesize)
* [retries](queryserviceclientoptions.md#optional-retries)

## Properties

### `Optional` autoClose

• **autoClose**? : *undefined | false | true*

Defined in src/query/query_service_client.ts:201

By default the iterator or stream will close the underlying HTTP2 session
at the end. Switch this flag to false to revert this behaviour. You might
want to do so when sharing the same underlying HTTP2 object amongs many clients.

___

### `Optional` cred

• **cred**? : *[CredentialTuple](../README.md#credentialtuple)*

Defined in src/query/query_service_client.ts:205

Default `Credentials` object to use by this object's methods

___

### `Optional` delay

• **delay**? : *undefined | number*

Defined in src/query/query_service_client.ts:191

Milliseconds to wait before attempting the same call again (default: 200)

___

### `Optional` pageSize

• **pageSize**? : *undefined | number*

Defined in src/query/query_service_client.ts:187

Max amount of response items in each page (default: 400)

___

### `Optional` retries

• **retries**? : *undefined | number*

Defined in src/query/query_service_client.ts:195

Amount of retries of the same call (default: 10)

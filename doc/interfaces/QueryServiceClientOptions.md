[@paloaltonetworks/pan-cortex-data-lake](../README.md) / QueryServiceClientOptions

# Interface: QueryServiceClientOptions

Configuration options for the QueryServiceClient object

## Table of contents

### Properties

- [autoClose](QueryServiceClientOptions.md#autoclose)
- [cred](QueryServiceClientOptions.md#cred)
- [delay](QueryServiceClientOptions.md#delay)
- [pageSize](QueryServiceClientOptions.md#pagesize)
- [retries](QueryServiceClientOptions.md#retries)

## Properties

### autoClose

• `Optional` **autoClose**: `boolean`

By default the iterator or stream will close the underlying HTTP2 session
at the end. Switch this flag to false to revert this behaviour. You might
want to do so when sharing the same underlying HTTP2 object amongs many clients.

#### Defined in

[src/query/query_service_client.ts:203](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L203)

___

### cred

• `Optional` **cred**: [`CredentialTuple`](../README.md#credentialtuple)

Default `Credentials` object to use by this object's methods

#### Defined in

[src/query/query_service_client.ts:207](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L207)

___

### delay

• `Optional` **delay**: `number`

Milliseconds to wait before attempting the same call again (default: 200)

#### Defined in

[src/query/query_service_client.ts:193](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L193)

___

### pageSize

• `Optional` **pageSize**: `number`

Max amount of response items in each page (default: 400)

#### Defined in

[src/query/query_service_client.ts:189](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L189)

___

### retries

• `Optional` **retries**: `number`

Amount of retries of the same call (default: 10)

#### Defined in

[src/query/query_service_client.ts:197](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_client.ts#L197)

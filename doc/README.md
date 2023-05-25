@paloaltonetworks/pan-cortex-data-lake

# @paloaltonetworks/pan-cortex-data-lake

## Table of contents

### Enumerations

- [ErrorTypes](enums/ErrorTypes.md)
- [logLevel](enums/logLevel.md)

### Classes

- [Http2Fetch](classes/Http2Fetch.md)
- [QueryService](classes/QueryService.md)
- [QueryServiceClient](classes/QueryServiceClient.md)
- [QueryServiceClientError](classes/QueryServiceClientError.md)
- [QueryServiceError](classes/QueryServiceError.md)

### Interfaces

- [Credentials](interfaces/Credentials.md)
- [QueryServiceClientOptions](interfaces/QueryServiceClientOptions.md)

### Type Aliases

- [CredentialTuple](README.md#credentialtuple)
- [Query](README.md#query)
- [QueryParams](README.md#queryparams)

### Variables

- [cortexConstants](README.md#cortexconstants)

### Functions

- [setLogLevel](README.md#setloglevel)

## Type Aliases

### CredentialTuple

Ƭ **CredentialTuple**: `Object`

Credential tuple

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cred` | [`Credentials`](interfaces/Credentials.md) | Credential object |
| `dlid` | `string` | Data lake unique identifier for this credential object |
| `entrypoint` | `string` | the CDL API entry point fqdn |

#### Defined in

[src/http2client.ts:80](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/http2client.ts#L80)

___

### Query

Ƭ **Query**: `Object`

Interface that describes a query job

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `jobId?` | `string` | Identifies the ID that you want the query job to use. This ID must be unique within the service. Maximum length is 1000 characters. May contain any alphanumeric character, and dash (-). |
| `params` | [`QueryParams`](README.md#queryparams) | Job configuration options |

#### Defined in

[src/query/query_service_models.ts:84](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L84)

___

### QueryParams

Ƭ **QueryParams**: `Object`

Describes mandatory and optional configuration options to perform a query job

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `dialect?` | `string` | Identifies the SQL query dialect that the query string uses. Defaults to Csql. Currently, only Csql is supported. |
| `properties?` | { `defaultPageSize?`: `number` ; `maxWait?`: `number` ; `priority?`: ``"immediate"`` \| ``"foreground"`` \| ``"background"`` ; `timeoutMs?`: `number`  } | - |
| `properties.defaultPageSize?` | `number` | Default number of log records retrieved for page of results. The value specified here identifies the number of records appearing in the response object’s result array. If the page is the last in the result set, this is the maximum number of records that will appear in the result array. This parameter’s maximum value is 100000. - default: 10000 |
| `properties.maxWait?` | `number` | Maximum number of milliseconds the request’s HTTP connection remains open waiting for a response. If the requested page cannot be returned in this amount of time, the service closes the connection without returning results. Maximum value is 2000 (2 seconds). If 0, the HTTP connection is closed immediately upon completion of the HTTP request. - default: no wait |
| `properties.priority?` | ``"immediate"`` \| ``"foreground"`` \| ``"background"`` | Client’s requested priority for this job. - immediate: Run with the highest priority. - foreground: Run with middle priority. - background: Run with lowest priority. - default: `foreground` |
| `properties.timeoutMs?` | `number` | Identifies the maximum number of milliseconds the job can run within Cortex before it completes. If this limit is reached before the job has retrieved its full query set, the job reports a state of Failed. In this case, some query results may be available, but the result set is not guaranteed to be complete. - default: none |
| `query` | `string` | SQL query that identifies the log records you want this query job to retrieve. |

#### Defined in

[src/query/query_service_models.ts:17](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/query/query_service_models.ts#L17)

## Variables

### cortexConstants

• `Const` **cortexConstants**: `Object`

Cortex constants

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `APIEPMAP` | { `americas`: `string` = USFQDN; `europe`: `string` = EUFQDN } | Map that links Cortex Data Lake regions with their corresponding FQDNs |
| `APIEPMAP.americas` | `string` | entry point for americas |
| `APIEPMAP.europe` | `string` | entry point for europe |
| `DEV_TOKEN_PROVIDER` | `string` | URL of the Palo Alto Networks Developers Relations developer token service |
| `EP_QUERY` | `string` | API path for the Cortex Query Service |
| `EP_SCHEMA` | `string` | API path for the Cortex Schema Service |
| `IDP_AUTH_URL` | `string` | Identity provider URL for token operations |
| `IDP_REVOKE_URL` | `string` | Identity provider URL for token revoke operations |
| `IDP_TOKEN_URL` | `string` | Identity provider URL for authentication requests |
| `OAUTH2SCOPEMAP` | { `ls-read`: `string` = 'logging-service:read' } | OAuth2 Identity Provider scopes for the Cortex Data Lake |
| `OAUTH2SCOPEMAP.ls-read` | `string` | - |

#### Defined in

[src/constants.ts:21](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/constants.ts#L21)

## Functions

### setLogLevel

▸ **setLogLevel**(`level`): `void`

Change the log level of the common logger at runtime

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | [`logLevel`](enums/logLevel.md) |

#### Returns

`void`

#### Defined in

[src/commonlogger.ts:63](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/src/commonlogger.ts#L63)

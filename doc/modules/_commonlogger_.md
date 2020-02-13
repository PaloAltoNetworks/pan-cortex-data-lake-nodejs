[pan-cortex-data-lake](../README.md) › ["commonlogger"](_commonlogger_.md)

# External module: "commonlogger"

## Index

### Enumerations

* [logLevel](../enums/_commonlogger_.loglevel.md)

### Functions

* [commonLogger](_commonlogger_.md#commonlogger)
* [setLogLevel](_commonlogger_.md#setloglevel)

## Functions

###  commonLogger

▸ **commonLogger**(`error`: [Error](../classes/_sdkerror_.sdkerror.md#static-error)): *void*

Defined in src/commonlogger.ts:34

logs an error object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | [Error](../classes/_sdkerror_.sdkerror.md#static-error) | object to be logged  |

**Returns:** *void*

▸ **commonLogger**(`level`: [logLevel](../enums/_commonlogger_.loglevel.md), `message`: string, `noPrefix?`: undefined | false | true): *void*

Defined in src/commonlogger.ts:41

logs a message string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`level` | [logLevel](../enums/_commonlogger_.loglevel.md) | level of the message |
`message` | string | the error message |
`noPrefix?` | undefined &#124; false &#124; true | to remove the 'CORTEX_SDK' prefix in the output  |

**Returns:** *void*

___

###  setLogLevel

▸ **setLogLevel**(`level`: [logLevel](../enums/_commonlogger_.loglevel.md)): *void*

Defined in src/commonlogger.ts:63

Change the log level of the common logger at runtime

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`level` | [logLevel](../enums/_commonlogger_.loglevel.md) |   |

**Returns:** *void*

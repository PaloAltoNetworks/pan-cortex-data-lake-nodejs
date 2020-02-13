[pan-cortex-data-lake](../README.md) › [__global](__global.md)

# Module: __global

Both schema service and ingestion service depend on the package avsc. That package contains
code that can run either in the server (NodeJS) or in the browser. So it references the type
'Blob' that would be available if you add the 'dom' library to the tsconfig file. I don't like
adding dom because IDE autocompletion provides too many options.
With this declaration we override the tsc compilation errors of the avsc package

## Index

### Type aliases

* [Blob](__global.md#blob)

## Type aliases

###  Blob

Ƭ **Blob**: *any*

Defined in src/index.ts:21

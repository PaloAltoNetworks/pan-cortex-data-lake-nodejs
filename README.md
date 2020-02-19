# pan-cortex-data-lake-nodejs
This Palo Alto Networks Cloud NodeJS library was created to assist developers
with programmatically interacting with the Palo Alto Networks Cortex Data Lake
API's.

## Installation
Incorporate the `pan-cortex-data-lake` NodeJS package in your project with the following
bash command:

```bash
npm i git://github.com/xhoms/pan-cortex-data-lake-nodejs
```

You can now import the package into your NodeJS code.

```javascript
const cortex = require('pan-cortex-data-lake');
```

Source code is written in TypeScript and the build process productes type
definition files which means you can leverage strongly type and code
auto-complete features.

```ts
import * as cortex from 'pan-cortex-data-lake'
```

# Authorization
There are two options to get your application authorized to access customer data
using the Cortex Data Lake API:
* Getting a client certificate (platform applications)
* Publishing your application in Cortex hub and using the code grant OAuth2 flow

Use the `QueryServiceClient.factory()` to create an object instance in any of
the previous cases:

Example of a mTLS object instance
```javascript
async init() {
    const mtlsCert = readFileSync(CERTIFICATE_FILE);
    const mtlsKey = readFileSync(KEY_FILE);
    const qsc = await QueryServiceClient.factory({ cert: mtlsCert, key: mtlsKey });
}
```

Example using OAuth2 credentials (JWT)
```javascript
async function init() {
    const credentials = {
        getToken: () => Promise.resolve(ACCESS_TOKEN),
        getEntryPoint: () => 'api.us.cdl.paloaltonetworks.com'
    };
    const qsc = cortex.QueryServiceClient.factory({
        cortexDefCredentials: credentials
    });
}
```

Take a look to the complementary repo [pan-cortex-hub-nodejs](https://github.com/xhoms/pan-cortex-hub-nodejs)
with a collection of compatible `credential` objects as well as full secret
repositories (`CortexCredentialProvider`) and building blocks for a SaaS
component to interface with Cortex hub.

# Getting started with QueryService
## Using stream readable interface
```javascript
function main() {
    const queryStream = qsc.stream("SELECT * from `" + INSTANCE_ID + ".firewall.traffic` LIMIT 10");
    return new Promise((res, rej) => {
        queryStream.on('error', rej);
        queryStream.on('end', res);
        // each object emitted corresponds to a page of results (any[])
        queryStream.on('data', console.log);
    })
}
```
## Using async iterable interface (introduced in ES2018)
```javascript
async function main() {
    for await (const page of qsc.iterator("SELECT * from `" + INSTANCE_ID + ".firewall.traffic` LIMIT 10")) {
        console.log(page);
    }
}
```
# Code snippets
Review the folder `/examples` for quick starting code

# Running the integration tests
1. Optional: run `npm run build:test` to build the mocha integration test (`/test` directory)
    1. set the `CORTEX_TEST_GOODCERT` environmental variable to the path to load good client-side certificates. The test suite will try to load a file named `process.env[CORTEX_TEST_GOODCERT]+'.cert'` and a file named `process.env[CORTEX_TEST_GOODCERT]+'.key'`
    2. set the environmental variables `CORTEX_TEST_BASEFQDN` and `CORTEX_TEST_TENANTID` to map to the Apollo 2.0 environment and tenant you'll be testing
    3. Run `npm run test` to execute the integration tests

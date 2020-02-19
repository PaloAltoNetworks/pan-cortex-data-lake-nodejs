/**
 * This snippet shows how to use the High-Level QueryServiceClient iterator
 * interface to execute a SQL query and navigate its results.
 * 
 * It uses the `for await` syntax introduced in ES2018 (requires NodeJS 10 or higher)
 */

import * as cortex from '@paloaltonetworks/pan-cortex-data-lake'

const SQLCMD = 'SELECT * FROM `<instance_id>.firewall.traffic` LIMIT 100'
const ACCESS_TOKEN = 'eyJh...BE9A'
const credentials: cortex.Credentials = {
    getToken: () => Promise.resolve(ACCESS_TOKEN),
    getEntryPoint: () => cortex.cortexConstants.APIEPMAP['americas']
}
const qsc = cortex.QueryServiceClient.factory({ cortexDefCredentials: credentials })

async function main() {
    for await (const page of qsc.iterator(SQLCMD)) {
        console.log(page)
    }
}

main().catch(console.error)
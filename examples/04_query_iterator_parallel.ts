/**
 * This snippet shows how to use the High-Level QueryServiceClient
 * Iterator interface to execute multiple SQL queries in parallel
 */

import * as cortex from '@paloaltonetworks/pan-cortex-data-lake'

const SQLCMD1 = 'SELECT * FROM `<instance_id>.firewall.traffic` LIMIT 100'
const SQLCMD2 = 'SELECT * FROM `<instance_id>.firewall.threat` LIMIT 100'
const ACCESS_TOKEN = 'eyJh...BE9A'
const credentials: cortex.Credentials = {
    getToken: () => Promise.resolve(ACCESS_TOKEN),
    getEntryPoint: () => cortex.cortexConstants.APIEPMAP['americas']
}
/**
 * Instantiate an Http2Fetch object to have access to its `init()` method
 */
const http2fetcher = new cortex.Http2Fetch({ cortexDefCredentials: credentials })
/**
 * Notice the `autoCose` property set to false
 */
const qsc = new cortex.QueryServiceClient(http2fetcher, { autoClose: false })

async function worker(SQLCmd) {
    for await (const page of qsc.iterator(SQLCmd)) {
        console.log(page)
    }
}

async function main() {
    /**
     * Explicitly set initial data structures to avoid race conditions
     */
    await http2fetcher.init()
    await Promise.all([
        worker(SQLCMD1),
        worker(SQLCMD2)
    ])
    /**
     * Remember to close the underlying connections once all jobs have been completed
     */
    return http2fetcher.close()
}

main().catch(console.error)
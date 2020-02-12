/**
 * This snippet shows how to use the High-Level QueryServiceClient
 * Iterator interface to execute multiple SQL queries in parallel to multiple
 * data lake instances.
 * 
 * In this case we're using one QueryServiceClient object and passing
 * credentials in the iterators method
 */

import * as cortex from 'pan-cortex-data-lake'

const SQLCMD1 = 'SELECT * FROM `<instance_id1>.firewall.traffic` LIMIT 100'
const SQLCMD2 = 'SELECT * FROM `<instance_id2>.firewall.traffic` LIMIT 100'
const ACCESS_TOKEN1 = 'eyJh...BE9A'
const ACCESS_TOKEN2 = 'eyJh...k276'

const credentials1: cortex.Credentials = {
    getToken: () => Promise.resolve(ACCESS_TOKEN1),
    getEntryPoint: () => cortex.cortexConstants.APIEPMAP['americas']
}

const credentials2: cortex.Credentials = {
    getToken: () => Promise.resolve(ACCESS_TOKEN2),
    getEntryPoint: () => cortex.cortexConstants.APIEPMAP['americas']
}

/**
 * Each credentials must have a unique data lake identifier
 */
const credTuple1: cortex.CredentialTuple = {
    cred: credentials1,
    dlid: 'datalake-1',
    entrypoint: credentials1.getEntryPoint()
}

const credTuple2: cortex.CredentialTuple = {
    cred: credentials2,
    dlid: 'datalake-2',
    entrypoint: credentials2.getEntryPoint()
}

/**
 * Notice we're not providing a default credentials object
 */
const http2fetcher = new cortex.Http2Fetch()
const qsc = new cortex.QueryServiceClient(http2fetcher, { autoClose: false })

async function worker(SQLCmd, cred) {
    /**
     * We pass a credentials tuple alongside the SQL command force default override
     */
    for await (const page of qsc.iterator(SQLCmd, cred)) {
        console.log(page)
    }
}

async function main() {
    /**
     * Each credential tuple must be initialitated on its own and in sequence
     * (parallel init could trigger race conditions)
     */
    await http2fetcher.init(credTuple1)
    await http2fetcher.init(credTuple2)
    await Promise.all([
        worker(SQLCMD1, credTuple1),
        worker(SQLCMD2, credTuple2)
    ])
    return http2fetcher.close()
}

main().catch(console.error)
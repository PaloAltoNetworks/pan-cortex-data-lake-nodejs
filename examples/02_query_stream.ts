/**
 * This snippet shows how to use the High-Level QueryServiceClient
 * Stream.Readable interface to execute a SQL query and navigate its results.
 */

import * as cortex from '@paloaltonetworks/pan-cortex-data-lake'

const SQLCMD = 'SELECT * FROM `<instance_id>.firewall.traffic` LIMIT 100'
const ACCESS_TOKEN = 'eyJh...BE9A'
const credentials: cortex.Credentials = {
    getToken: () => Promise.resolve(ACCESS_TOKEN),
    getEntryPoint: () => cortex.cortexConstants.APIEPMAP['americas']
}
const qsc = cortex.QueryServiceClient.factory({ cortexDefCredentials: credentials })

function main() {
    const stream = qsc.stream(SQLCMD)
    return new Promise((resolve, reject) => {
        stream.on('error', reject)
        stream.on('end', resolve)
        stream.on('data', console.log)
    })
}

main().catch(console.error)
/**
 * This snippet shows how to consume Credentials objects from the package
 * `@paloaltonetworks/pan-cortex-hub`
 * 
 * It uses the `for await` syntax introduced in ES2018 (requires NodeJS 10 or higher)
 */

import * as dl from '@paloaltonetworks/pan-cortex-data-lake'
import * as hub from '@paloaltonetworks/pan-cortex-hub'

const SQLCMD = 'SELECT * FROM `<instance_id>.firewall.traffic` LIMIT 100'
const DEVELOPER_TOKEN = 'eyJh...BE9A'
const DEVELOPER_TOKEN_PROVIDER = 'https://app.apiexplorer.rocks/request_token'

async function main() {
    const credentials = hub.DevTokenCredentials.factory({
        developerToken: DEVELOPER_TOKEN,
        developerTokenProvider: DEVELOPER_TOKEN_PROVIDER
    })
    const qsc = dl.QueryServiceClient.factory({ cortexDefCredentials: credentials })
    for await (const page of qsc.iterator(SQLCMD)) {
        console.log(page)
    }
}

main().catch(console.error)
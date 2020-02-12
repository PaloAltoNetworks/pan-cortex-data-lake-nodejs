/**
 * This snippet shows how to use the QueryService low level API to execute a
 * simple query
 */

import * as cortex from 'pan-cortex-data-lake'

const SQLCMD = 'SELECT * FROM `<instance_id>.firewall.traffic` LIMIT 100'
const ACCESS_TOKEN = 'eyJh...BE9A'

const credentials: cortex.Credentials = {
    getToken: () => Promise.resolve(ACCESS_TOKEN),
    getEntryPoint: () => cortex.cortexConstants.APIEPMAP['americas']
}

const qs = cortex.QueryService.factory({ cortexDefCredentials: credentials })

async function main() {
    /**
     * Create job operation
     */
    const queryJobResponse = await qs.createJob({ params: { query: SQLCMD } })
    console.log('Job Id', queryJobResponse.jobId)
    /**
     * Wait 10 seconds for the job to complete
     */
    await new Promise(resolve => setTimeout(resolve, 10000))
    /**
     * Get job status and verify it has been completed (state == 'DONE)
     */
    const queryJobDetail = await qs.getJobStatus(queryJobResponse.jobId)
    console.log('Job state', queryJobDetail.state)
    if (queryJobDetail.state == 'DONE') {
        /**
         * Get job results
         */
        const queryResultResp = await qs.getJobResults(queryJobResponse.jobId)
        console.log('Records in job', queryResultResp.rowsInJob)
    }
    /**
     * Optionally you can delete the job
     */
    await qs.deleteJob(queryJobResponse.jobId)
    /**
     * Remember to close the underlying HTTP2 session when no longer needed
     */
    return qs.close()
}

main().catch(console.error)
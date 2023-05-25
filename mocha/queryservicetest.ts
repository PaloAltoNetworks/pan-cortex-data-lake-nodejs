import * as assert from 'assert'
import { describe, it } from 'mocha'
import { QueryService, QueryServiceClient, Http2Fetch, QueryServiceError, setLogLevel, logLevel } from '../lib'
import { createHash } from 'crypto'
import { readFileSync } from 'fs';
const BASEFQDN = process.env['CORTEX_TEST_BASEFQDN'] || 'cortex-stg5.us.stg.cdl.pan.run'
const TENANTID = process.env['CORTEX_TEST_TENANTID'] || '587718190'
const GOOD_CERTNAME = process.env['CORTEX_TEST_GOODCERT']
const BADSCOPE_CERTNAME = process.env['CORTEX_TEST_BADSCOPECERT']
const BADTENANT_CERTNAME = process.env['CORTEX_TEST_BADTENANTCERT']
const SQL_COMMAND = 'SELECT * from `' + TENANTID + '.firewall.traffic` LIMIT 10'
const SQL_LONG_COMMAND = (x: number) => 'SELECT * from `' + TENANTID + '.firewall.traffic` LIMIT ' + x
const BAD_SQL_SYNTAX = 'HELLO WORLD!'
const INCOMPATIBLE_SQL_COMMAND = 'SELECT "hello word!" AS greeting'

interface UnitTestConfig {
    baseFqdn: string,
    mTlsCertGood: string,
    mTlsKeyGood: string,
    mTlsCertOutscoped: string,
    mTlsKeyOutscoped: string,
    mTlsCertNoapp: string,
    mTlsKeyNoapp: string,
    tenantId: string
}

const utConfig: UnitTestConfig = {
    baseFqdn: BASEFQDN,
    mTlsCertGood: GOOD_CERTNAME && readFileSync(GOOD_CERTNAME + '.cert').toString(),
    mTlsKeyGood: GOOD_CERTNAME && readFileSync(GOOD_CERTNAME + '.key').toString(),
    mTlsCertNoapp: BADTENANT_CERTNAME && readFileSync(BADTENANT_CERTNAME + '.cert').toString(),
    mTlsKeyNoapp: BADTENANT_CERTNAME && readFileSync(BADTENANT_CERTNAME + '.key').toString(),
    mTlsCertOutscoped: BADSCOPE_CERTNAME && readFileSync(BADSCOPE_CERTNAME + '.cert').toString(),
    mTlsKeyOutscoped: BADSCOPE_CERTNAME && readFileSync(BADSCOPE_CERTNAME + '.key').toString(),
    tenantId: TENANTID
}

let initJobCount = Date.now()
function uuid(): string {
    let d = createHash('sha1').update(initJobCount.toString()).digest('hex')
    initJobCount++
    return [0, 6, 12].map(x => d.substr(x, 6)).join('-')
}

describe.skip('queryAPI', function () {
    before(function () {
        setLogLevel(logLevel.NONE)
        if (utConfig.baseFqdn === undefined || utConfig.baseFqdn == ''
            || utConfig.mTlsCertGood === undefined || utConfig.mTlsKeyGood === undefined) {
            console.error('Define CORTEX_TEST_GOODCERT env variable, please. Skipping all tests.')
            this.skip()
        }
    })
    this.timeout(4000)

    describe.skip('bad app certificate error', function () {
        let client: Http2Fetch
        let qs: QueryService
        before(async function () {
            if (utConfig.mTlsCertNoapp === undefined || utConfig.mTlsKeyNoapp === undefined) {
                console.log("CORTEX_TEST_BADTENANTCERT env variable not provided. Skipping")
                return this.skip()
            }
            client = new Http2Fetch({ cert: utConfig.mTlsCertNoapp, key: utConfig.mTlsKeyNoapp, cortexBaseFqdn: utConfig.baseFqdn })
            qs = new QueryService(client)
        })
        after(async function (done) {
            if (client) await client.close()
            done()
        })
        it('Using the wrong app certificate must throw a "query.sdk.cortex" Error of type "QueryApi" (code 401)', async function () {
            await assert.rejects(qs.createJob({
                jobId: uuid(),
                params: {
                    query: SQL_COMMAND
                }
            }), (e) => e instanceof QueryServiceError && e.errorType == 'QueryApi' && e.status == 401)
        })
    })

    describe.skip('bad scoped app certificate error', function () {
        let client: Http2Fetch
        let qs: QueryService
        before(async function () {
            if (utConfig.mTlsCertOutscoped === undefined || utConfig.mTlsKeyOutscoped === undefined) {
                console.log("CORTEX_TEST_BADSCOPECERT env variable not provided. Skipping")
                return this.skip()
            }
            client = new Http2Fetch({ cert: utConfig.mTlsCertOutscoped, key: utConfig.mTlsKeyOutscoped, cortexBaseFqdn: utConfig.baseFqdn })
            qs = new QueryService(client)
        })
        after(async function (done) {
            if (client) await client.close()
            done()
        })
        it('Using an out-scoped app certificate must throw a "query.sdk.cortex" Error of type "QueryApi" (code 401)', async function () {
            await assert.rejects(qs.createJob({
                jobId: uuid(),
                params: {
                    query: SQL_COMMAND
                }
            }), (e) => e instanceof QueryServiceError && e.errorType == 'QueryApi' && e.status == 403)
        })
    })

    describe('API layer general errors', function () {
        let client: Http2Fetch
        let qs: QueryService
        before(async function () {
            client = new Http2Fetch({ cert: utConfig.mTlsCertGood, key: utConfig.mTlsKeyGood, cortexBaseFqdn: utConfig.baseFqdn })
            qs = new QueryService(client)
        })
        after(async function (done) {
            await client.close()
            done()
        })
        it('Sending a malformed SQL command must throw a "query.sdk.cortex" Error of type "QueryApi" (code 400)', async function () {
            return await assert.rejects(qs.createJob({
                jobId: uuid(),
                params: {
                    query: BAD_SQL_SYNTAX
                }
            }), (e) => e instanceof QueryServiceError && e.errorType == 'QueryApi' && e.status == 400)
        })
        it('Sending and unsupported SQL command must throw a "query.sdk.cortex" Error of type "QueryApi" (code 501)', async function () {
            return await assert.rejects(qs.createJob({
                jobId: uuid(),
                params: {
                    query: INCOMPATIBLE_SQL_COMMAND
                }
            }), (e) => e instanceof QueryServiceError && e.errorType == 'QueryApi' && e.status == 500)
        })
        it('Sending a malformed query API payload must throw a "query.sdk.cortex" Error of type "QueryApi" (code 400)', async function () {
            let jobId = uuid()
            return await assert.rejects((qs as any).createJob({
                jobId: jobId
            }), (e) => e instanceof QueryServiceError && e.errorType == 'QueryApi' && e.status == 400)
        })
        it('Invalid job details payload must throw a "query.sdk.cortex" Error of type "QueryApi" (code 404)', async function () {
            return await assert.rejects((qs as any).getJobStatus(),
                (e) => e instanceof QueryServiceError && e.status == 404)
        })
        it('Gettting job details for a non-exitant job must throw a "query.sdk.cortex" Error of type "QueryApi" (code 404)', async function () {
            const nonExJobId = uuid() + 'x'
            return await assert.rejects(qs.getJobStatus(nonExJobId)
                , (e) => e instanceof QueryServiceError && e.status == 404)
        })
        it('Providing unknown parameters to job results must throw a "query.sdk.cortex" Error of type "QueryApi" (code 404)', async function () {
            const jobId = uuid()
            let qsResponse = await qs.createJob({
                jobId: jobId,
                params: {
                    query: SQL_COMMAND
                }
            })
            assert.rejects(async () => {
                await qs.getJobResults(qsResponse.jobId, { maxWaits: 0 } as any)
            }, (e) => e instanceof QueryServiceError && e.status == 400)
        })
        it('Deleting a non-exitant job must throw a "query.sdk.cortex" Error of type "QueryApi" (code 404)', async function () {
            const nonExJobId = uuid() + 'x'
            return await assert.rejects(qs.deleteJob(nonExJobId)
                , (e) => e instanceof QueryServiceError && e.status == 404)
        })
    })

    describe('working with Query Service jobs', function () {
        this.timeout(16000)
        let client: Http2Fetch
        let qs: QueryService
        before(async function () {
            client = new Http2Fetch({ cert: utConfig.mTlsCertGood, key: utConfig.mTlsKeyGood, cortexBaseFqdn: utConfig.baseFqdn })
            qs = new QueryService(client)
        })
        after(async function (done) {
            await client.close()
            done()
        })
        let jobId = uuid()
        it('A good query API payload must resolve to an object with matching jobIb and uri', async function () {
            await assert.doesNotReject(async () => {
                assert.equal((await qs.createJob({
                    jobId: jobId,
                    params: {
                        query: SQL_COMMAND
                    }
                })).jobId, jobId)
            })
        })
        it('Repeating jobIb must throw a "query.sdk.cortex" Error of type "QueryApi" (code 409)', async function () {
            await assert.rejects(qs.createJob({
                jobId: jobId,
                params: {
                    query: SQL_COMMAND
                }
            }), (e) => e instanceof QueryServiceError && e.errorType == 'QueryApi' && e.status == 409)
        })
        it('Gettting job details for a valid jobId must return a valid respone', async function () {
            const jobId = uuid()
            let qsResponse = await qs.createJob({
                jobId: jobId,
                params: {
                    query: SQL_COMMAND
                }
            })
            let jobDetails = await qs.getJobStatus(qsResponse.jobId)
            assert.equal(jobDetails.jobId, jobId)
        })
        it('Cancelling a jobId must return a valid response', async function () {
            const jobId = uuid()
            let response = await qs.createJob({
                jobId: jobId,
                params: {
                    query: SQL_LONG_COMMAND(9999)
                }
            })
            await qs.deleteJob(response.jobId)
        })
        it('Retrieving the job list must return a valid response', async function () {
            await assert.doesNotReject(qs.getJobsList({ tenantId: utConfig.tenantId, state: 'failed' }))
        })
        it('"valuesArray" format must provide a schema and each response item must be an array of fields', async function () {
            const jobId = uuid()
            await assert.doesNotReject(async () => {
                const numRecords = 28
                const jobResponse = await qs.createJob({ jobId: jobId, params: { query: SQL_LONG_COMMAND(numRecords) } })
                assert.equal(jobResponse.jobId, jobId)
                await new Promise<boolean>((res, rej) => setTimeout(async () => {
                    try {
                        const jobResults = await qs.getJobResults(jobId, { maxWait: 1000, resultFormat: 'valuesArray' })
                        res(jobResults.resultFormat == 'valuesArray' && jobResults.schema !== undefined &&
                            Array.isArray(jobResults.page.result.data) && jobResults.page.result.data.length == numRecords &&
                            jobResults.page.result.data.every(Array.isArray))
                    } catch (e) {
                        rej(e)
                    }
                }, 1000))
            })
        })
        it('"valuesDictionary" format must not provide a schema and each response item must be an object', async function () {
            const jobId = uuid()
            await assert.doesNotReject(async () => {
                const numRecords = 28
                const jobResponse = await qs.createJob({ jobId: jobId, params: { query: SQL_LONG_COMMAND(numRecords) } })
                assert.equal(jobResponse.jobId, jobId)
                await new Promise<boolean>((res, rej) => setTimeout(async () => {
                    try {
                        const jobResults = await qs.getJobResults(jobId, { maxWait: 1000, resultFormat: 'valuesDictionary' })
                        res(jobResults.resultFormat == 'valuesDictionary' && jobResults.schema === undefined &&
                            Array.isArray(jobResults.page.result.data) && jobResults.page.result.data.length == numRecords)
                    } catch (e) {
                        rej(e)
                    }
                }, 1000))
            })
        })
        it('Job results pagination should work', async function () {
            const jobId = uuid()
            await assert.doesNotReject(async () => {
                const jobResponse = await qs.createJob({ jobId: jobId, params: { query: SQL_LONG_COMMAND(28) } })
                assert.equal(jobResponse.jobId, jobId)
                const cursor1 = await new Promise<string>((res, rej) => setTimeout(async () => {
                    try {
                        const jobResults = await qs.getJobResults(jobId, { maxWait: 1000, pageSize: 12 })
                        if (jobResults.rowsInJob == 28 && jobResults.rowsInPage == 12) return res(jobResults.page.pageCursor)
                    } catch (e) {
                        rej(e)
                    }
                    rej(new Error("Page #1 error"))
                }, 1000))
                const cursor2 = await new Promise<string>((res, rej) => setTimeout(async () => {
                    try {
                        const jobResults = await qs.getJobResults(jobId, { maxWait: 1000, pageSize: 12, pageCursor: cursor1 })
                        if (jobResults.rowsInJob == 28 && jobResults.rowsInPage == 12) return res(jobResults.page.pageCursor)
                    } catch (e) {
                        rej(e)
                    }
                    rej(new Error("Page #2 error"))
                }, 1000))
                await new Promise<void>((res, rej) => setTimeout(async () => {
                    try {
                        const jobResults = await qs.getJobResults(jobId, { maxWait: 1000, pageSize: 12, pageCursor: cursor2 })
                        if (jobResults.rowsInJob == 28 && jobResults.rowsInPage == 4 && jobResults.page.pageCursor === null) return res()
                    } catch (e) {
                        rej(e)
                    }
                    rej(new Error("Page #3 error"))
                }, 1000))
            })
        })
    })
    describe('working with Query Service Client', function () {
        this.timeout(120000)
        let client: Http2Fetch
        let qs: QueryServiceClient
        before(async function () {
            client = new Http2Fetch({ cert: utConfig.mTlsCertGood, key: utConfig.mTlsKeyGood, cortexBaseFqdn: utConfig.baseFqdn })
            qs = new QueryServiceClient(client)
        })
        after(async function (done) {
            await client.close()
            done()
        })
        const records = 3000
        it('iterator interface should work', async function () {
            let index = 0
            for await (const item of qs.iterator(SQL_LONG_COMMAND(records))) index += item.length
            assert.equal(index, records)
        })
        it('breaking the iterator object should work', async function () {
            const breakAt = 2000
            let index = 0
            for await (const item of qs.iterator(SQL_LONG_COMMAND(records))) {
                index += item.length
                if (index >= breakAt) break
            }
            assert(breakAt <= index && index < records)
        })
        it('readable stream in paused mode should work', async function () {
            let index = 0
            let stream = qs.stream(SQL_LONG_COMMAND(records))
            await assert.doesNotReject(new Promise<void>((res, rej) => {
                stream.on('readable', () => {
                    let data = stream.read()
                    if (data === null) return
                    else index += data.length
                })
                stream.on('end', (x) => {
                    if (index == records) res()
                    else rej('unexpected amount of received records')
                })
            }))
        })
        it('readable stream in flow mode should work', async function () {
            let index = 0
            let stream = qs.stream(SQL_LONG_COMMAND(records))
            await assert.doesNotReject(new Promise<void>((res, rej) => {
                stream.on('data', (x) => {
                    if (x === null) return
                    else index += x.length
                })
                stream.on('end', (x) => {
                    if (index == records) res()
                    else rej('unexpected amount of received records')
                })
            }))
        })
    })
})

describe.skip('work in progress', async function () {
    this.timeout(120000)
    let client: Http2Fetch
    let qs: QueryServiceClient
    before(async function () {
        client = new Http2Fetch({ cert: utConfig.mTlsCertGood, key: utConfig.mTlsKeyGood, cortexBaseFqdn: utConfig.baseFqdn })
        qs = new QueryServiceClient(client)
    })
    after(async function (done) {
        await client.close()
        done()
    })
})

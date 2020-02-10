import * as assert from 'assert'
import { describe, it } from 'mocha'
import { readFileSync } from 'fs';
import { SchemaService, SchemaServiceError, Http2Fetch, setLogLevel, logLevel } from '../lib'
import { Metadata } from '../lib/schema/schema_service_models';
import { fail } from 'assert';
import { Type, schema } from 'avsc';

const BASEFQDN = process.env['CORTEX_TEST_BASEFQDN'] || 'cortex-stg5.us.stg.cdl.pan.run'
const TENANTID = process.env['CORTEX_TEST_TENANTID'] || '587718190'
const GOOD_CERTNAME = process.env['CORTEX_TEST_GOODCERT']
const BADSCOPE_CERTNAME = process.env['CORTEX_TEST_BADSCOPECERT']
const BADTENANT_CERTNAME = process.env['CORTEX_TEST_BADTENANTCERT']

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

describe.skip('schemaAPI', function () {
    before(function () {
        setLogLevel(logLevel.NONE)
        if (utConfig.baseFqdn === undefined || utConfig.baseFqdn == ''
            || utConfig.mTlsCertGood === undefined || utConfig.mTlsKeyGood === undefined) {
            console.error('Define CORTEX_TEST_GOODCERT env variable, please. Skipping all tests.')
            this.skip()
        }
    })
    this.timeout(4000)

    describe('working with Schema Service', function () {
        this.timeout(8000)
        let client: Http2Fetch
        let ss: SchemaService
        before(async function () {
            client = new Http2Fetch({ cert: utConfig.mTlsCertGood, key: utConfig.mTlsKeyGood, cortexBaseFqdn: utConfig.baseFqdn })
            ss = new SchemaService(client)
        })
        after(async function (done) {
            await client.close()
            done()
        })
        it('Retrieve the full list of schemas should be an array', async function () {
            await assert.doesNotReject(async () => {
                assert.ok(Array.isArray(await ss.get()))
            })
        })
        it('Retrieving a the schema "firewall.traffic" must be at version 1 or higer', async function () {
            await assert.doesNotReject(async () => {
                assert.ok((await ss.get('firewall.traffic')).version >= 1)
            })
        })
        it('Retrieving an unknon schema should fail with status code 404', async function () {
            return await assert.rejects(ss.get('fir.traffic'), (e) =>
                e instanceof SchemaServiceError && e.errorType == 'SchemaApi' && e.status == 404
            )
        })
        it('Create a new schema should retrieve version 1', async function () {
            await assert.doesNotReject(async () => {
                let { version, schemaId } = await ss.create('xhoms.test', {
                    derived: false,
                    operations: 'ALL',
                    partitionColumn: 'log_time',
                    timestampColumns: ['log_time'],
                    partitionScheme: { frequency: 1, timeUnit: 'YEARS' },
                    public: false,
                    streamPartitionFactor: 1
                }, { xh_data: "hello", log_time: "world" }, "xhoms test doc")
                assert.ok(version === 1 && schemaId == 'xhoms.test')
                await ss.delete('xhoms.test')
            })
        })
        it('Create a new schema should retrieve version 1 (overload 1)', async function () {
            await assert.doesNotReject(async () => {
                let { version, schemaId } = await ss.create('xhoms.test', {
                    derived: false,
                    operations: 'ALL',
                    partitionColumn: 'log_time',
                    timestampColumns: ['log_time'],
                    partitionScheme: { frequency: 1, timeUnit: 'YEARS' },
                    public: false,
                    streamPartitionFactor: 1
                }, "[{\"name\":\"xhoms.test\",\"type\":\"record\",\"fields\":[{\"name\":\"xh_data\",\"type\":\"string\"},{\"name\":\"log_time\",\"type\":\"string\"}]}]")
                assert.ok(version === 1 && schemaId == 'xhoms.test')
                await ss.delete('xhoms.test')
            })
        })
        it('Create a new schema should retrieve version 1 (overload 2)', async function () {
            await assert.doesNotReject(async () => {
                let { version, schemaId } = await ss.create({
                    schemaId: "xhoms.test",
                    structure: Type.forSchema([{
                        name: "xhoms.test",
                        type: "record",
                        fields: [
                            { name: "xh_data", type: "string" },
                            { name: "log_time", type: "string" }]
                    }] as schema.DefinedType[]),
                    metadata: {
                        public: true,
                        partitionColumn: "log_time",
                        timestampColumns: [
                            "log_time"
                        ],
                        partitionScheme: {
                            "timeUnit": "YEARS",
                            "frequency": 1
                        },
                        derived: false,
                        operations: "ALL",
                        streamPartitionFactor: 1
                    }
                })
                assert.ok(version === 1 && schemaId == 'xhoms.test')
                await ss.delete('xhoms.test')
            })
        })
        it('Create a new schema with invalid payload should fail (status == 500)', async function () {
            try {
                await ss.create({
                    schemaId: "xhoms.test",
                    structure: {} as Type,
                    metadata: {
                        public: true,
                        partitionColumn: "log_time",
                        timestampColumns: [
                            "log_time"
                        ],
                        partitionScheme: {
                            "timeUnit": "YEARS",
                            "frequency": 1
                        },
                        derived: false,
                        operations: "ALL",
                        streamPartitionFactor: 1
                    }
                })
                await ss.delete('xhoms.test')
                fail("It should have failed")
            } catch (e) {
                if (e instanceof SchemaServiceError) assert.ok(e.status == 500)
                else fail('unexpected error type')
            }
        })
        it('Create a schema that already exists should fail', async function () {
            try {
                let metadata: Metadata = {
                    derived: false,
                    operations: 'ALL',
                    partitionColumn: 'log_time',
                    timestampColumns: ['log_time'],
                    partitionScheme: { frequency: 1, timeUnit: 'YEARS' },
                    public: false,
                    streamPartitionFactor: 1
                }
                let { version, schemaId } = await ss.create('xhoms.test', metadata, { xh_data: "hello", log_time: "world" }, "xhoms test doc")
                assert.ok(version === 1 && schemaId == 'xhoms.test')
                try {
                    await ss.create('xhoms.test', metadata, { xh_data: "hello", log_time: "world" }, "xhoms test doc")
                } catch (e) {
                    if (e instanceof SchemaServiceError) assert.ok(e.status == 409)
                    else fail('unexpected error type')
                }
                await ss.delete('xhoms.test')
            } catch (e) {
                fail("It shouldn't have failed")
            }
        })
        it('Update schema must increase its version', async function () {
            try {
                let metadata: Metadata = {
                    derived: false,
                    operations: 'ALL',
                    partitionColumn: 'log_time',
                    timestampColumns: ['log_time'],
                    partitionScheme: { frequency: 1, timeUnit: 'YEARS' },
                    public: false,
                    streamPartitionFactor: 1
                }
                let { version, schemaId } = await ss.create('xhoms.test', metadata, { xh_data: "hello", log_time: "world" }, "xhoms test doc")
                assert.ok(version === 1 && schemaId == 'xhoms.test')
                try {
                    await ss.update('xhoms.test', metadata, { xh_data: "hello", log_time: "world" }, "xhoms test doc")
                    let { version, schemaId } = await ss.get('xhoms.test')
                    assert.ok(version === 2 && schemaId == 'xhoms.test')
                } catch {
                    fail("It shouldn't have failed")
                } finally {
                    await ss.delete('xhoms.test')
                }
            } catch {
                fail("It shouldn't have failed")
            }
        })
        it('Delete unexistant schema should fail (status == 500)', async function () {
            try {
                await ss.delete('xhoms.random')
            } catch (e) {
                if (e instanceof SchemaServiceError) assert.ok(e.status == 500)
                else fail('unexpected error type')
            }
        })
        /* it('Delete schema test', async function () {
            await assert.doesNotReject(async () => {
                await ss.delete('xhoms.test')
            })
        }) */
    })
})

describe.skip('work in progress', async function () {
    this.timeout(120000)
    let client: Http2Fetch
    let ss: SchemaService
    before(async function () {
        client = new Http2Fetch({ cert: utConfig.mTlsCertGood, key: utConfig.mTlsKeyGood, cortexBaseFqdn: utConfig.baseFqdn })
        ss = new SchemaService(client)
    })
    after(async function (done) {
        await client.close()
        done()
    })
})

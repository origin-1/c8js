/* eslint-env mocha */

import { createTempDirectory, joinPath }    from './utils.js';
import { strict as assert }                 from 'assert';
import c8js                                 from 'c8js';
import { existsSync }                       from 'fs';
import { join }                             from 'path';

describe
(
    'function `c8js`',
    () =>
    {
        it
        (
            'returns a result',
            async () =>
            {
                const tempDirectory = await createTempDirectory();
                const result =
                await c8js
                (
                    joinPath('test/fixtures/noop.js'),
                    { reporter: [], tempDirectory },
                );
                assert.equal(result.status, 0);
                assert.equal(result.signal, null);
                assert.deepEqual(result.output, [null, '', '']);
                assert(typeof result.pid === 'number');
                assert.equal(result.stdout, '');
                assert.equal(result.stderr, '');
                assert.equal(result.error, null);
                assert.deepEqual(result.coverageMap.data, { __proto__: null });
            },
        );

        describe
        (
            'with option `throwExecError`',
            () =>
            {
                it
                (
                    '`early`',
                    async () =>
                    {
                        const reportsDirectory = await createTempDirectory();
                        await assert.rejects
                        (
                            c8js
                            (
                                joinPath('test/fixtures/fail.js'),
                                { reporter: 'lcovonly', reportsDirectory, throwExecError: 'early' },
                            ),
                            { code: 42, killed: false, signal: null },
                        );
                        const fileName = join(reportsDirectory, 'lcov.info');
                        assert(!existsSync(fileName));
                    },
                );

                it
                (
                    '`late`',
                    async () =>
                    {
                        const reportsDirectory = await createTempDirectory();
                        await assert.rejects
                        (
                            c8js
                            (
                                joinPath('test/fixtures/fail.js'),
                                { reporter: 'lcovonly', reportsDirectory, throwExecError: 'late' },
                            ),
                            { code: 42, killed: false, signal: null },
                        );
                        const fileName = join(reportsDirectory, 'lcov.info');
                        assert(existsSync(fileName));
                    },
                );

                it
                (
                    '`never`',
                    async () =>
                    {
                        const reportsDirectory = await createTempDirectory();
                        const { error } =
                        await c8js
                        (
                            joinPath('test/fixtures/fail.js'),
                            { reporter: 'lcovonly', reportsDirectory, throwExecError: 'never' },
                        );
                        assert.equal(error.code, 42);
                        assert.equal(error.killed, false);
                        assert.equal(error.signal, null);
                        const fileName = join(reportsDirectory, 'lcov.info');
                        assert(existsSync(fileName));
                    },
                );
            },
        );
    },
);

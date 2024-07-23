/* eslint-env mocha */

import assert                                                       from 'node:assert/strict';
import { existsSync }                                               from 'node:fs';
import { join }                                                     from 'node:path';
import { assertStackTraceConnected, createTempDirectory, joinPath } from './utils.js';
import c8js                                                         from 'c8js';

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
                function assertErrorExpected({ code, constructor, killed, signal, stack })
                {
                    assert.equal(code, 42);
                    assert.equal(constructor, Error);
                    assert.equal(killed, false);
                    assert.equal(signal, null);
                    assertStackTraceConnected(stack);
                    return true;
                }

                it
                (
                    '\'early\'',
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
                            assertErrorExpected,
                        );
                        const fileName = join(reportsDirectory, 'lcov.info');
                        assert(!existsSync(fileName));
                    },
                );

                it
                (
                    '\'late\'',
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
                            assertErrorExpected,
                        );
                        const fileName = join(reportsDirectory, 'lcov.info');
                        assert(existsSync(fileName));
                    },
                );

                it
                (
                    '\'never\'',
                    async () =>
                    {
                        const reportsDirectory = await createTempDirectory();
                        const { error } =
                        await c8js
                        (
                            joinPath('test/fixtures/fail.js'),
                            { reporter: 'lcovonly', reportsDirectory, throwExecError: 'never' },
                        );
                        assertErrorExpected(error);
                        const fileName = join(reportsDirectory, 'lcov.info');
                        assert(existsSync(fileName));
                    },
                );
            },
        );
    },
);

/* eslint-env mocha */

import assert                               from 'node:assert/strict';
import { realpath, writeFile }              from 'node:fs/promises';
import { join }                             from 'node:path';
import { createTempDirectory, joinPath }    from './utils.js';
import c8js                                 from 'c8js';

describe
(
    'function `checkCoverage`',
    () =>
    {
        it
        (
            'fails only when the coverage is lower than expected',
            async () =>
            {
                const tempDirectory = await createTempDirectory();
                await c8js.exec(joinPath('test/fixtures/thresholds/index.js'), { tempDirectory });
                const [settledResultLow, settledResultMid, settledResultHigh] =
                await Promise.allSettled
                (
                    [
                        c8js.checkCoverage
                        ({ lines: 50, exclude: [], perFile: true, tempDirectory }),
                        c8js.checkCoverage
                        ({ lines: 60, exclude: [], perFile: true, tempDirectory }),
                        c8js.checkCoverage
                        ({ lines: 70, exclude: [], perFile: true, tempDirectory }),
                    ],
                );
                assert.equal(settledResultLow.status, 'fulfilled');
                assert.equal(settledResultMid.status, 'rejected');
                assert.equal(settledResultMid.reason.code, 'LOW_COVERAGE');
                assert.deepEqual
                (
                    settledResultMid.reason.fails,
                    [
                        {
                            coverage:   50,
                            fileName:   'test/fixtures/thresholds/50-percent.js',
                            key:        'lines',
                            threshold:  60,
                        },
                    ],
                );
                assert.equal(settledResultHigh.status, 'rejected');
                assert.equal(settledResultHigh.reason.code, 'LOW_COVERAGE');
                assert.deepEqual
                (
                    settledResultHigh.reason.fails,
                    [
                        {
                            coverage:   50,
                            fileName:   'test/fixtures/thresholds/50-percent.js',
                            key:        'lines',
                            threshold:  70,
                        },
                        {
                            coverage:   66.66,
                            fileName:   'test/fixtures/thresholds/67-percent.js',
                            key:        'lines',
                            threshold:  70,
                        },
                    ],
                );
            },
        );

        it
        (
            'preserves backslashes in Unix file names',
            async function ()
            {
                if (process.platform === 'win32') this.skip();
                const cwd = await realpath(await createTempDirectory());
                await writeFile(join(cwd, 'foo\\bar.js'), '');
                const promise =
                c8js.checkCoverage
                (
                    {
                        all:            true,
                        cwd,
                        lines:          100,
                        perFile:        true,
                        tempDirectory:  '',
                    },
                );
                await assert.rejects
                (
                    promise,
                    {
                        fails:
                        [
                            {
                                coverage:   0,
                                fileName:   'foo\\bar.js',
                                key:        'lines',
                                threshold:  100,
                            },
                        ],
                    },
                );
            },
        );
    },
);

/* eslint-env mocha */

import { createTempDirectory, joinPath }    from './utils.js';
import { strict as assert }                 from 'assert';
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
    },
);

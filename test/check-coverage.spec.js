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
                await c8js.exec(joinPath('test/fixtures/50-percent.js'), { tempDirectory });
                const [settledResultLow, settledResultHigh] =
                await Promise.allSettled
                (
                    [
                        c8js.checkCoverage
                        ({ lines: 40, exclude: [], perFile: true, tempDirectory }),
                        c8js.checkCoverage
                        ({ lines: 60, exclude: [], perFile: true, tempDirectory }),
                    ],
                );
                assert.equal(settledResultLow.status, 'fulfilled');
                assert.equal(settledResultHigh.status, 'rejected');
                assert.equal(settledResultHigh.reason.code, 'LOW_COVERAGE');
            },
        );
    },
);

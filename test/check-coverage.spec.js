/* eslint-env mocha */

import { createTempDirectory, joinPath }    from './utils.js';
import c8js                                 from 'c8js';

describe
(
    'function `checkCoverage`',
    () =>
    {
        it
        (
            'does not fail for an empty file',
            async () =>
            {
                const tempDirectory = await createTempDirectory();
                await c8js
                (
                    joinPath('test/fixtures/noop.js'),
                    { reporter: [], tempDirectory },
                );
                await c8js.checkCoverage({ 100: true, perFile: true, tempDirectory });
            },
        );
    },
);

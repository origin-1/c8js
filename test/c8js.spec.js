/* eslint-env mocha */

import { createTempDirectory, joinPath }    from './utils.js';
import { strict as assert }                 from 'assert';
import c8js                                 from 'c8js';

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
    },
);

/* eslint-env mocha */

import { createTempDirectory, joinPath, loadJSON }  from './utils.js';
import { strict as assert }                         from 'assert';
import c8js                                         from 'c8js';
import { join }                                     from 'path';

describe
(
    'function `report`',
    () =>
    {
        let reportsDirectory;

        beforeEach
        (
            async () =>
            {
                reportsDirectory = await createTempDirectory();
                await c8js.exec(joinPath('test/fixtures/noop.js'), { reportsDirectory });
            },
        );

        it
        (
            'returns a coverage map',
            async () =>
            {
                const coverageMap = await c8js.report({ reporter: [], reportsDirectory });
                assert.deepEqual(coverageMap.data, { __proto__: null });
            },
        );

        it
        (
            'resolves relative (Node.js built-in module) paths',
            async () =>
            {
                await c8js.report
                (
                    {
                        allowExternal: true,
                        cwd: joinPath('test/fixtures'),
                        omitRelative: false,
                        reporter: 'json',
                        reportsDirectory,
                        resolve: 'resolve-test',
                    },
                );
                const report = await loadJSON(join(reportsDirectory, 'coverage-final.json'));
                assert.notDeepEqual(report, { });
            },
        );
    },
);

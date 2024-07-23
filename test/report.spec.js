/* eslint-env mocha */

import assert                                       from 'node:assert/strict';
import { join }                                     from 'node:path';
import { fileURLToPath }                            from 'node:url';
import { createTempDirectory, joinPath, loadJSON }  from './utils.js';
import c8js                                         from 'c8js';

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
                        allowExternal:  true,
                        cwd:            joinPath('test/fixtures'),
                        omitRelative:   false,
                        reporter:       'json',
                        reportsDirectory,
                        resolve:        'resolve-test',
                    },
                );
                const report = await loadJSON(join(reportsDirectory, 'coverage-final.json'));
                assert.notDeepEqual(report, { });
            },
        );

        it
        (
            'creates a reporter with the expected options',
            async () =>
            {
                const cwd = joinPath('test/fixtures');
                const reporter = fileURLToPath(new URL('./custom-reporter.cjs', import.meta.url));
                let actualOptions;
                const callback =
                options =>
                {
                    actualOptions = options;
                };
                const reporterOptions = { [reporter]: { callback, foo: 'bar', maxCols: 200 } };
                await c8js.report({ cwd, reporter, reporterOptions, reportsDirectory });
                assert.deepEqual
                (
                    actualOptions,
                    {
                        callback,
                        foo:            'bar',
                        maxCols:        200,
                        projectRoot:    cwd,
                        skipEmpty:      false,
                        skipFull:       false,
                    },
                );
            },
        );
    },
);

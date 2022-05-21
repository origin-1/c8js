/*
This is a port of the c8 integration test suite.

The following tests are not included:

* "c8 allows relative files to be included" (not portable)
* "c8 supports externally set NODE_V8_COVERAGE" (not applicable)
* "report supports reporting on directories outside cwd" (not applicable)
* "report supports reporting on single directories outside cwd" (not applicable)
*/

/* eslint-env mocha */

import { createDirectory, deleteDirectory, standardizePath }    from '../lib/utils.js';
import { joinPath, loadJSON, projectRoot }                      from './utils.js';
import { strict as assert }                                     from 'assert';
import c8js                                                     from 'c8js';
import { readFile, writeFile }                                  from 'fs/promises';
import { createRequire }                                        from 'module';
import { join }                                                 from 'path';
import { pathToFileURL }                                        from 'url';

const TS_NODE_PATH = createRequire(import.meta.url).resolve('ts-node/dist/bin');

const assertReportMatches =
{
    async cobertura(actualReport)
    {
        const expectedDirName = joinPath(expectedBaseDirName, 'cobertura');
        const expectedReport =
        await readFile(join(expectedDirName, 'cobertura-coverage.xml'), 'utf8');
        assert.equal(actualReport, expectedReport);
    },
    async json(testName, actualResult)
    {
        const expectedDirName = joinPath(expectedBaseDirName, testName);
        const expectedCoverageFileName = join(expectedDirName, 'coverage-final.json');
        const [actualCoverage, expectedCoverage] =
        await Promise.all([loadReport(testName), loadJSON(expectedCoverageFileName)]);
        assert.deepEqual(actualCoverage, expectedCoverage);
        if (actualResult)
        {
            const expectedResultFileURL = pathToFileURL(join(expectedDirName, 'result.json'));
            const expectedResult = await loadJSON(expectedResultFileURL);
            assert.deepEqual(filterResult(actualResult), filterResult(expectedResult));
        }
    },
};

const expectedBaseDirName = 'test/expected';

const filterResult = ({ stdout, stderr, status, signal }) => ({ stdout, stderr, status, signal });

async function loadReport(name)
{
    const fileName = joinPath('tmp', name, 'coverage-final.json');
    const rawReport = await loadJSON(fileName);
    const report = standardizeReport(rawReport);
    return report;
}

async function saveJSON(fileName, value)
{
    const text = JSON.stringify(value, null, 2);
    await writeFile(fileName, text);
}

function standardizeReport(report)
{
    const returnValue = { };
    for (const [oldKey, value] of Object.entries(report))
    {
        const newKey = standardizePath(oldKey, projectRoot);
        value.path = standardizePath(value.path, projectRoot);
        returnValue[newKey] = value;
    }
    return returnValue;
}

const updateReport = // eslint-disable-line no-unused-vars
{
    async cobertura(actualReport)
    {
        const expectedDirName = joinPath(expectedBaseDirName, 'cobertura');
        await createDirectory(expectedDirName);
        await writeFile(join(expectedDirName, 'cobertura-coverage.xml'), actualReport);
    },

    async json(testName, result)
    {
        const expectedDirName = joinPath(expectedBaseDirName, testName);
        const [report] =
        await Promise.all([loadReport(testName), createDirectory(expectedDirName)]);
        const expectedCoverageFileName = join(expectedDirName, 'coverage-final.json');
        const expectedResultFileName = join(expectedDirName, 'result.json');
        const promises = [saveJSON(expectedCoverageFileName, report)];
        if (result)
            promises.push(saveJSON(expectedResultFileName, filterResult(result)));
        await Promise.all(promises);
    },
};

describe
(
    'c8js',
    () =>
    {
        before
        (
            async () =>
            {
                const path = joinPath('tmp');
                await deleteDirectory(path);
            },
        );

        it
        (
            'reports coverage for script that exits normally',
            async () =>
            {
                const testName = 'normal';
                const reportsDirectory = joinPath('tmp', testName);
                const result =
                await c8js
                (
                    joinPath('test/fixtures/c8/normal.js'),
                    {
                        exclude: 'test/*.js',
                        reporter: 'json',
                        reportsDirectory,
                        silent: true,
                    },
                );
                await assertReportMatches.json(testName, result);
            },
        );

        it
        (
            'merges reports from subprocesses together',
            async () =>
            {
                const testName = 'multiple-spawn';
                const reportsDirectory = joinPath('tmp', testName);
                const result =
                await c8js
                (
                    joinPath('test/fixtures/c8/multiple-spawn.js'),
                    {
                        cwd: joinPath(),
                        exclude: 'test/*.js',
                        reporter: 'json',
                        reportsDirectory,
                        silent: true,
                    },
                );
                await assertReportMatches.json(testName, result);
            },
        );

        it
        (
            'throws an error when report output fails',
            async () =>
            {
                const testName = 'unknown';
                const reportsDirectory = joinPath('tmp', testName);
                await assert.rejects
                (
                    c8js
                    (
                        joinPath('test/fixtures/noop.js'),
                        { reporter: 'unknown', reportsDirectory },
                    ),
                    { code: 'MODULE_NOT_FOUND', constructor: Error },
                );
            },
        );

        it
        (
            'allows for files outside of cwd',
            async () =>
            {
                // Here we nest this test into the report directory making the multidir directories
                // outside of `cwd`.
                // If the option `allowExternal` is not set, the multidir files will now show up in
                // the file report, even though they were required in.
                const testName = 'allow-external';
                const reportsDirectory = joinPath('tmp', testName);
                const result =
                await c8js
                (
                    'allowExternal.js',
                    {
                        allowExternal: true,
                        cwd: joinPath('test/fixtures/c8/report'),
                        reporter: 'json',
                        reportsDirectory,
                        silent: true,
                    },
                );
                await assertReportMatches.json(testName, result);
            },
        );

        it
        (
            'allows for multiple overrides of src location for option `all`',
            async () =>
            {
                // Here we nest this test into the report directory making the multidir directories
                // outside of `cwd`.
                // Note that the target `srcOverride` does not require fields from these directories
                // but we want them initialized to 0 via `all`. As such we `allowExternal` and
                // provide multiple `src` patterns to override `cwd`.
                const testName = 'src';
                const reportsDirectory = joinPath('tmp', testName);
                const result =
                await c8js
                (
                    'srcOverride.js',
                    {
                        all: true,
                        allowExternal: true,
                        cwd: joinPath('test/fixtures/c8/report'),
                        reporter: 'json',
                        reportsDirectory,
                        silent: true,
                        src:
                        [
                            joinPath('test/fixtures/c8/multidir1'),
                            joinPath('test/fixtures/c8/multidir2'),
                            joinPath('test/fixtures/c8/report'),
                        ],
                    },
                );
                await assertReportMatches.json(testName, result);
            },
        );

        describe
        (
            'function `checkCoverage`',
            () =>
            {
                before
                (
                    async () =>
                    {
                        const testName = 'check-coverage';
                        const reportsDirectory = joinPath('tmp', testName);
                        await c8js
                        (
                            joinPath('test/fixtures/c8/normal.js'),
                            {
                                exclude: 'test/*.js',
                                reporter: 'json',
                                reportsDirectory,
                                silent: true,
                            },
                        );
                    },
                );

                it
                (
                    'succeeds if coverage is within threshold',
                    async () =>
                    {
                        const testName = 'check-coverage';
                        const reportsDirectory = joinPath('tmp', testName);
                        await c8js.checkCoverage
                        (
                            {
                                branches: 55,
                                exclude: 'test/*.js',
                                lines: 70,
                                reportsDirectory,
                                statements: 70,
                            },
                        );
                        await assertReportMatches.json(testName);
                    },
                );

                it
                (
                    'fails if coverage is below threshold',
                    async () =>
                    {
                        const testName = 'check-coverage';
                        const reportsDirectory = joinPath('tmp', testName);
                        await assert.rejects
                        (
                            c8js.checkCoverage
                            ({ exclude: 'test/*.js', lines: 90, reportsDirectory }),
                            {
                                code: 'LOW_COVERAGE',
                                fails:
                                [
                                    {
                                        coverage: 83.33,
                                        fileName: null,
                                        key: 'lines',
                                        threshold: 90,
                                    },
                                ],
                                message:
                                'Insufficient coverage\n' +
                                'Coverage for lines (83.33%) does not meet global threshold (90%)',
                            },
                        );
                    },
                );

                it
                (
                    'allows option `threshold` to be applied on per-file basis',
                    async () =>
                    {
                        const testName = 'check-coverage';
                        const reportsDirectory = joinPath('tmp', testName);
                        await assert.rejects
                        (
                            c8js.checkCoverage
                            (
                                {
                                    cwd: joinPath(),
                                    exclude: 'test/*.js',
                                    lines: 90,
                                    perFile: true,
                                    reportsDirectory,
                                },
                            ),
                            {
                                code: 'LOW_COVERAGE',
                                fails:
                                [
                                    {
                                        coverage: 75,
                                        fileName: 'test/fixtures/c8/normal.js',
                                        key: 'lines',
                                        threshold: 90,
                                    },
                                ],
                                message:
                                'Insufficient coverage\n' +
                                'Coverage for lines (75%) does not meet threshold (90%) for ' +
                                'test/fixtures/c8/normal.js',
                            },
                        );
                    },
                );

                it
                (
                    'allows option `checkCoverage` when executing `c8js`',
                    async () =>
                    {
                        const testName = 'check-coverage-opt';
                        const reportsDirectory = joinPath('tmp', testName);
                        await assert.rejects
                        (
                            c8js
                            (
                                joinPath('test/fixtures/c8/normal.js'),
                                {
                                    checkCoverage: true,
                                    exclude: 'test/*.js',
                                    lines: 90,
                                    reporter: [],
                                    reportsDirectory,
                                    silent: true,
                                },
                            ),
                            {
                                message:
                                'Insufficient coverage\n' +
                                'Coverage for lines (83.33%) does not meet global threshold (90%)',
                            },
                        );
                    },
                );

                it
                (
                    'function `c8js` with option `100`',
                    async () =>
                    {
                        const testName = 'check-coverage-100';
                        const reportsDirectory = joinPath('tmp', testName);
                        await assert.rejects
                        (
                            c8js
                            (
                                joinPath('test/fixtures/c8/normal.js'),
                                {
                                    100: true,
                                    exclude: 'test/*.js',
                                    reporter: [],
                                    reportsDirectory,
                                    silent: true,
                                },
                            ),
                            {
                                code: 'LOW_COVERAGE',
                                fails:
                                [
                                    {
                                        coverage: 83.33,
                                        fileName: null,
                                        key: 'lines',
                                        threshold: 100,
                                    },
                                    {
                                        coverage: 60,
                                        fileName: null,
                                        key: 'functions',
                                        threshold: 100,
                                    },
                                    {
                                        coverage: 85.71,
                                        fileName: null,
                                        key: 'branches',
                                        threshold: 100,
                                    },
                                    {
                                        coverage: 83.33,
                                        fileName: null,
                                        key: 'statements',
                                        threshold: 100,
                                    },
                                ],
                                message:
                                'Insufficient coverage\n' +
                                'Coverage for lines (83.33%) does not meet global threshold ' +
                                '(100%)\n' +
                                'Coverage for functions (60%) does not meet global threshold ' +
                                '(100%)\n' +
                                'Coverage for branches (85.71%) does not meet global threshold ' +
                                '(100%)\n' +
                                'Coverage for statements (83.33%) does not meet global threshold ' +
                                '(100%)',
                            },
                        );
                    },
                );

                it
                (
                    'function `checkCoverage` with option `100`',
                    async () =>
                    {
                        const testName = 'check-coverage';
                        const reportsDirectory = joinPath('tmp', testName);
                        await assert.rejects
                        (
                            c8js.checkCoverage
                            ({ 100: true, exclude: 'test/*.js', reportsDirectory }),
                            {
                                code: 'LOW_COVERAGE',
                                fails:
                                [
                                    {
                                        coverage: 83.33,
                                        fileName: null,
                                        key: 'lines',
                                        threshold: 100,
                                    },
                                    {
                                        coverage: 60,
                                        fileName: null,
                                        key: 'functions',
                                        threshold: 100,
                                    },
                                    {
                                        coverage: 85.71,
                                        fileName: null,
                                        key: 'branches',
                                        threshold: 100,
                                    },
                                    {
                                        coverage: 83.33,
                                        fileName: null,
                                        key: 'statements',
                                        threshold: 100,
                                    },
                                ],
                                message:
                                'Insufficient coverage\n' +
                                'Coverage for lines (83.33%) does not meet global threshold ' +
                                '(100%)\n' +
                                'Coverage for functions (60%) does not meet global threshold ' +
                                '(100%)\n' +
                                'Coverage for branches (85.71%) does not meet global threshold ' +
                                '(100%)\n' +
                                'Coverage for statements (83.33%) does not meet global threshold ' +
                                '(100%)',
                            },
                        );
                    },
                );
            },
        );

        describe
        (
            'function `report`',
            () =>
            {
                before
                (
                    async () =>
                    {
                        const testName = 'report';
                        const reportsDirectory = joinPath('tmp', testName);
                        await c8js.exec
                        (
                            joinPath('test/fixtures/c8/normal.js'),
                            { reportsDirectory, silent: true },
                        );
                    },
                );

                it
                (
                    'generates report from existing temporary files',
                    async () =>
                    {
                        const testName = 'report';
                        const reportsDirectory = joinPath('tmp', testName);
                        await c8js.report
                        ({ exclude: 'test/*.js', reporter: 'json', reportsDirectory });
                        await assertReportMatches.json(testName);
                    },
                );

                it
                (
                    'supports option `check-coverage` when generating reports',
                    async () =>
                    {
                        const testName = 'report';
                        const reportsDirectory = joinPath('tmp', testName);
                        await assert.rejects
                        (
                            c8js.report
                            (
                                {
                                    checkCoverage: true,
                                    exclude: 'test/*.js',
                                    lines: 90,
                                    reporter: 'json',
                                    reportsDirectory,
                                },
                            ),
                            {
                                message:
                                'Insufficient coverage\n' +
                                'Coverage for lines (83.33%) does not meet global threshold (90%)',
                            },
                        );
                    },
                );
            },
        );

        describe
        (
            'ESM Modules', () =>
            {
                it
                (
                    'collects coverage for ESM modules',
                    async () =>
                    {
                        const testName = 'esm';
                        const reportsDirectory = joinPath('tmp', testName);
                        const result =
                        await c8js
                        (
                            joinPath('test/fixtures/c8/import.mjs'),
                            {
                                exclude: 'test/*.js',
                                reporter: 'json',
                                reportsDirectory,
                                silent: true,
                            },
                        );
                        await assertReportMatches.json(testName, result);
                    },
                );
            },
        );

        describe
        (
            '/* c8 ignore next */',
            () =>
            {
                it
                (
                    'ignores lines with special comment',
                    async () =>
                    {
                        const testName = 'special-comment';
                        const reportsDirectory = joinPath('tmp', testName);
                        const result =
                        await c8js
                        (
                            joinPath('test/fixtures/c8/c8-ignore-next.js'),
                            {
                                exclude: 'test/*.js',
                                reporter: 'json',
                                reportsDirectory,
                                silent: true,
                            },
                        );
                        await assertReportMatches.json(testName, result);
                    },
                );

                it
                (
                    'does not incorrectly mark previous branch as uncovered (see ' +
                    'https://github.com/bcoe/c8/issues/254)',
                    async () =>
                    {
                        const testName = 'issue-254';
                        const reportsDirectory = joinPath('tmp', testName);
                        const result =
                        await c8js
                        (
                            joinPath('test/fixtures/c8/issue-254.js'),
                            {
                                exclude: 'test/*.js',
                                reporter: 'json',
                                reportsDirectory,
                                silent: true,
                            },
                        );
                        await assertReportMatches.json(testName, result);
                    },
                );
            },
        );

        describe
        (
            '/* c8 ignore start/stop */',
            () =>
            {
                it
                (
                    'ignores lines with special comment',
                    async () =>
                    {
                        const testName = 'start-stop';
                        const reportsDirectory = joinPath('tmp', testName);
                        const result =
                        await c8js
                        (
                            joinPath('test/fixtures/c8/c8-ignore-start-stop.js'),
                            {
                                exclude: 'test/*.js',
                                reporter: 'json',
                                reportsDirectory,
                                silent: true,
                            },
                        );
                        await assertReportMatches.json(testName, result);
                    },
                );
            },
        );

        describe
        (
            'source-maps',
            () =>
            {
                const testSourceMap =
                (testName, path) =>
                async () =>
                {
                    const reportsDirectory = joinPath('tmp', testName);
                    const result =
                    await c8js
                    (
                        joinPath(path),
                        { exclude: 'test/*.js', reporter: 'json', reportsDirectory, silent: true },
                    );
                    await assertReportMatches.json(testName, result);
                };

                describe
                (
                    'TypeScript',
                    () =>
                    {
                        // Bugs:
                        //   closing '}' on `if` is not covered.
                        it
                        (
                            'remaps branches',
                            testSourceMap
                            (
                                'source-map-branches-typescript',
                                'test/fixtures/c8/source-maps/branches/branches.typescript.js',
                            ),
                        );

                        // Bugs:
                        //   closing '}' on `if` is not covered.
                        it
                        (
                            'remaps classes',
                            testSourceMap
                            (
                                'source-map-classes-typescript',
                                'test/fixtures/c8/source-maps/classes/classes.typescript.js',
                            ),
                        );
                    },
                );

                describe
                (
                    'UglifyJS',
                    () =>
                    {
                        // Bugs:
                        //   string in `console.info` shown as uncovered branch.
                        it
                        (
                            'remaps branches',
                            testSourceMap
                            (
                                'source-map-branches-uglify',
                                'test/fixtures/c8/source-maps/branches/branches.uglify.js',
                            ),
                        );

                        // Bugs:
                        //   string in `console.info` shown as uncovered branch.
                        it
                        (
                            'remaps classes',
                            testSourceMap
                            (
                                'source-map-classes-uglify',
                                'test/fixtures/c8/source-maps/classes/classes.uglify.js',
                            ),
                        );
                    },
                );

                describe
                (
                    'nyc',
                    () =>
                    {
                        it
                        (
                            'remaps branches',
                            testSourceMap
                            (
                                'source-map-branches-nyc',
                                'test/fixtures/c8/source-maps/branches/branches.nyc.js',
                            ),
                        );

                        it
                        (
                            'remaps classes',
                            testSourceMap
                            (
                                'source-map-classes-nyc',
                                'test/fixtures/c8/source-maps/classes/classes.nyc.js',
                            ),
                        );
                    },
                );

                describe
                (
                    'rollup',
                    () =>
                    {
                        it
                        (
                            'remaps branches',
                            testSourceMap
                            (
                                'source-map-branches-rollup',
                                'test/fixtures/c8/source-maps/branches/branches.rollup.js',
                            ),
                        );

                        it
                        (
                            'remaps classes',
                            testSourceMap
                            (
                                'source-map-classes-rollup',
                                'test/fixtures/c8/source-maps/classes/classes.rollup.js',
                            ),
                        );
                    },
                );

                describe
                (
                    'ts-node',
                    () =>
                    {
                        it
                        (
                            'reads source-map from cache and applies to coverage',
                            async () =>
                            {
                                const testName = 'source-map-ts-node';
                                const reportsDirectory = joinPath('tmp', testName);
                                const result =
                                await c8js
                                (
                                    TS_NODE_PATH,
                                    [joinPath('test/fixtures/c8/ts-node-basic.ts')],
                                    {
                                        exclude: 'test/*.js',
                                        reporter: 'json',
                                        reportsDirectory,
                                        silent: true,
                                    },
                                );
                                await assertReportMatches.json(testName, result);
                            },
                        );
                    },
                );

                // See: https://github.com/bcoe/c8/issues/232
                it
                (
                    'does not attempt to load source map URLs that aren\'t',
                    testSourceMap
                    (
                        'source-map-fake',
                        'test/fixtures/c8/source-maps/fake-source-map.js',
                    ),
                );
            },
        );

        describe
        (
            'option `all`',
            () =>
            {
                it
                (
                    'reports coverage for unloaded js files as 0 for line, branch and function',
                    async () =>
                    {
                        const testName = 'vanilla-all';
                        const reportsDirectory = joinPath('tmp', testName);
                        const result =
                        await c8js
                        (
                            'test/fixtures/c8/all/vanilla/main.js',
                            {
                                all: true,
                                cwd: joinPath(),
                                // add an exclude to avoid default excludes of test/**
                                exclude: '**/*.ts',
                                include: 'test/fixtures/c8/all/vanilla/**/*.js',
                                reporter: 'json',
                                reportsDirectory,
                                silent: true,
                            },
                        );
                        await assertReportMatches.json(testName, result);
                    },
                );

                it
                (
                    'reports coverage for unloaded transpiled ts files as 0 for line, branch and ' +
                    'function',
                    async () =>
                    {
                        const testName = 'all-ts';
                        const reportsDirectory = joinPath('tmp', testName);
                        const result =
                        await c8js
                        (
                            'test/fixtures/c8/all/ts-compiled/main.js',
                            {
                                all: true,
                                cwd: joinPath(),
                                // add an exclude to avoid default excludes of test/**
                                exclude: 'test/*.js',
                                include: 'test/fixtures/c8/all/ts-compiled/**/*.js',
                                reporter: 'json',
                                reportsDirectory,
                                silent: true,
                            },
                        );
                        await assertReportMatches.json(testName, result);
                    },
                );

                it
                (
                    'reports coverage for unloaded ts files as 0 for line, branch and function ' +
                    'when using ts-node',
                    async () =>
                    {
                        const testName = 'all-ts-node';
                        const reportsDirectory = joinPath('tmp', testName);
                        const result =
                        await c8js
                        (
                            TS_NODE_PATH,
                            ['test/fixtures/c8/all/ts-only/main.ts'],
                            {
                                all: true,
                                cwd: joinPath(),
                                // add an exclude to avoid default excludes of test/**
                                exclude: 'test/*.js',
                                include: 'test/fixtures/c8/all/ts-only/**/*.ts',
                                reporter: 'json',
                                reportsDirectory,
                                silent: true,
                            },
                        );
                        await assertReportMatches.json(testName, result);
                    },
                );

                it
                (
                    'allows for option `all` to be used in conjunction with option `checkCoverage`',
                    async () =>
                    {
                        const testName = 'all-check-coverage';
                        const reportsDirectory = joinPath('tmp', testName);
                        const result =
                        await assert.rejects
                        (
                            c8js
                            (
                                'test/fixtures/c8/all/vanilla/main.js',
                                {
                                    all: true,
                                    checkCoverage: true,
                                    cwd: joinPath(),
                                    // add an exclude to avoid default excludes of test/**
                                    exclude: '**/*.ts',
                                    include: 'test/fixtures/c8/all/vanilla/**/*.js',
                                    lines: 100,
                                    reporter: 'json',
                                    reportsDirectory,
                                    silent: true,
                                },
                            ),
                            {
                                code: 'LOW_COVERAGE',
                                fails:
                                [
                                    {
                                        coverage: 64.28,
                                        fileName: null,
                                        key: 'lines',
                                        threshold: 100,
                                    },
                                ],
                                message:
                                'Insufficient coverage\n' +
                                'Coverage for lines (64.28%) does not meet global threshold (100%)',
                            },
                        );
                        await assertReportMatches.json(testName, result);
                    },
                );

                it
                (
                    'allows for option `all` to be used with the function `checkCoverage`',
                    async () =>
                    {
                        const testName = 'all-check-coverage-as-command';
                        const reportsDirectory = joinPath('tmp', testName);
                        const options =
                        {
                            all: true,
                            cwd: joinPath(),
                            // add an exclude to avoid default excludes of test/**
                            exclude: '**/*.ts',
                            include: 'test/fixtures/c8/all/vanilla/**/*.js',
                            lines: 90,
                            reporter: 'json',
                            reportsDirectory,
                            silent: true,
                        };
                        // generate v8 output
                        await c8js
                        (
                            joinPath('test/fixtures/c8/all/vanilla/main.js'),
                            options,
                        );
                        // invoke function `checkCoverage` with option `all`
                        await assert.rejects
                        (
                            c8js.checkCoverage(options),
                            {
                                code: 'LOW_COVERAGE',
                                fails:
                                [
                                    {
                                        coverage: 64.28,
                                        fileName: null,
                                        key: 'lines',
                                        threshold: 90,
                                    },
                                ],
                                message:
                                'Insufficient coverage\n' +
                                'Coverage for lines (64.28%) does not meet global threshold (90%)',
                            },
                        );
                    },
                );
            },
        );

        // see: https://github.com/bcoe/c8/issues/149
        it
        (
            'cobertura report escapes special characters',
            async () =>
            {
                const testName = 'cobertura';
                const reportsDirectory = joinPath('tmp', testName);
                await c8js
                (
                    'test/fixtures/c8/computed-method.js',
                    {
                        cwd: joinPath(),
                        exclude: 'test/*.js',
                        reporter: 'cobertura',
                        reportsDirectory,
                        silent: true,
                    },
                );
                const rawReport =
                await readFile(joinPath('tmp/cobertura/cobertura-coverage.xml'), 'utf8');
                const report =
                rawReport
                .replace(/timestamp="[0-9]{13,}"/, 'timestamp="nnnn"')
                .replace(/<source>.*?<\/source>/, '<source>/foo/file</source>')
                .replace(/\\/g, '/');
                await assertReportMatches.cobertura(report);
            },
        );

        it
        (
            'collects coverage for script with shebang',
            async () =>
            {
                const testName = 'shebang';
                const reportsDirectory = joinPath('tmp', testName);
                const result =
                await c8js
                (
                    joinPath('test/fixtures/c8/shebang.js'),
                    { exclude: 'test/*.js', reporter: 'json', reportsDirectory, silent: true },
                );
                await assertReportMatches.json(testName, result);
            },
        );

        describe
        (
            'option `excludeAfterRemap`',
            () =>
            {
                it
                (
                    'applies exclude rules after source maps are applied',
                    async () =>
                    {
                        const testName = 'source-map';
                        const reportsDirectory = joinPath('tmp', testName);
                        const result =
                        await c8js
                        (
                            joinPath('test/fixtures/c8/source-maps/branches/branches.rollup.js'),
                            {
                                exclude: ['test/*.js', '**/branch-1.js'],
                                excludeAfterRemap: true,
                                reporter: 'json',
                                reportsDirectory,
                                silent: true,
                            },
                        );
                        await assertReportMatches.json(testName, result);
                    },
                );
            },
        );

        describe
        (
            'option `extension`',
            () =>
            {
                it
                (
                    'includes coverage when extensions specified',
                    async () =>
                    {
                        const testName = 'extension';
                        const reportsDirectory = joinPath('tmp', testName);
                        const result =
                        await c8js
                        (
                            process.execPath,
                            [joinPath('test/fixtures/c8/custom-ext.special')],
                            {
                                exclude: 'test/*.js',
                                extension: ['.js', '.special'],
                                reporter: 'json',
                                reportsDirectory,
                                silent: true,
                            },
                        );
                        await assertReportMatches.json(testName, result);
                    },
                );

                it
                (
                    'includes coverage when extensions specified with option `all`',
                    async () =>
                    {
                        const testName = 'extension-all';
                        const reportsDirectory = joinPath('tmp', testName);
                        const result =
                        await c8js
                        (
                            process.execPath,
                            ['c8/custom-ext.special'],
                            {
                                all: true,
                                cwd: joinPath('test/fixtures'),
                                exclude: '**/*.ts',
                                extension: ['.js', '.special'],
                                reporter: 'json',
                                reportsDirectory,
                                silent: true,
                            },
                        );
                        await assertReportMatches.json(testName, result);
                    },
                );
            },
        );
    },
);

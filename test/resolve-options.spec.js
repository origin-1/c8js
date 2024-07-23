/* eslint-env mocha */

import assert               from 'node:assert/strict';
import { tmpdir }           from 'node:os';
import { join }             from 'node:path';
import { pathToFileURL }    from 'node:url';
import resolveOptions       from '../lib/resolve-options.js';
import { joinPath }         from './utils.js';

describe
(
    'resolveOptions',
    () =>
    {
        describe
        (
            'parses a configuration file',
            () =>
            {
                it
                (
                    'located by `cwd`',
                    async () =>
                    {
                        const cwd = joinPath('test/fixtures/config');
                        const config = await resolveOptions({ cwd });
                        assert.equal(config.excludeAfterRemap, true);
                        assert.equal(config.omitRelative, false);
                        assert.equal(config.reportsDirectory, join(cwd, 'xyz'));
                        assert.deepEqual
                        (
                            config.src,
                            [
                                joinPath('test/fixtures/config/a'),
                                joinPath('test/fixtures/config/b'),
                                joinPath('test/fixtures/config/c'),
                            ],
                        );
                        assert.deepEqual(config.watermarks, { branches: [10, 90] });
                    },
                );

                it
                (
                    'specified by `c8Config`',
                    async () =>
                    {
                        const cwd = joinPath('test/fixtures/config');
                        const config =
                        await resolveOptions({ c8Config: 'subdir/c8-config.json', cwd });
                        assert.equal(config.excludeAfterRemap, true);
                        assert.equal(config.mergeAsync, true);
                        assert.equal(config.omitRelative, false);
                        assert.equal(config.reportsDirectory, join(cwd, 'xyz'));
                        assert.deepEqual
                        (
                            config.src,
                            [
                                joinPath('test/fixtures/config/a'),
                                joinPath('test/fixtures/config/b'),
                                joinPath('test/fixtures/config/c'),
                            ],
                        );
                        assert.deepEqual
                        (config.watermarks, { branches: [10, 90], lines: [20, 80] });
                    },
                );
            },
        );

        describe
        (
            'ignores a configuration file',
            () =>
            {
                it
                (
                    'located by `cwd`',
                    async () =>
                    {
                        const cwd = joinPath('test/fixtures/config');
                        const config = await resolveOptions({ cwd, useC8Config: false });
                        assert.equal(config.excludeAfterRemap, false);
                        assert.equal(config.omitRelative, true);
                        assert.equal(config.reportsDirectory, join(cwd, 'coverage'));
                        assert.equal(config.src, cwd);
                        assert.equal(config.watermarks, undefined);
                    },
                );

                it
                (
                    'specified by `c8Config`',
                    async () =>
                    {
                        const cwd = joinPath('test/fixtures/config');
                        const config =
                        await resolveOptions
                        ({ c8Config: 'subdir/c8-config.json', cwd, useC8Config: false });
                        assert.equal(config.excludeAfterRemap, false);
                        assert.equal(config.mergeAsync, false);
                        assert.equal(config.omitRelative, true);
                        assert.equal(config.reportsDirectory, join(cwd, 'coverage'));
                        assert.equal(config.src, cwd);
                        assert.equal(config.watermarks, undefined);
                    },
                );
            },
        );

        it
        (
            'throws an error if an unknown option is specified',
            async () =>
            {
                await assert.rejects
                (
                    resolveOptions({ foo: undefined }),
                    {
                        code:               'C8JS_UNKNOWN_OPTIONS',
                        message:            'The following option is not known to c8js: \'foo\'',
                        unknownOptionNames: ['foo'],
                    },
                );
            },
        );

        it
        (
            'throws an error if multiple unknown options are specified',
            async () =>
            {
                await assert.rejects
                (
                    resolveOptions({ foo: 1, 42: 2, bar: 3 }),
                    {
                        code:               'C8JS_UNKNOWN_OPTIONS',
                        message:
                        'The following options are not known to c8js: \'42\', \'bar\', and \'foo\'',
                        unknownOptionNames: ['42', 'bar', 'foo'],
                    },
                );
            },
        );

        it
        (
            'throws an error if the configuration file is invalid',
            async () =>
            {
                const c8Config = joinPath('test/fixtures/config/invalid');
                await assert.rejects
                (
                    resolveOptions({ c8Config }),
                    ({ message }) => message.startsWith(`Unable to parse file '${c8Config}': `),
                );
            },
        );

        it
        (
            'resolves relative paths relative to `cwd`',
            async () =>
            {
                const cwd = tmpdir();
                const config =
                await resolveOptions
                (
                    {
                        cwd,
                        resolve:        'resolve',
                        src:            ['src-1', 'src-2'],
                        tempDirectory:  'temp-directory',
                    },
                );
                assert.equal(config.reportsDirectory, join(cwd, 'coverage'));
                assert.equal(config.resolve, join(cwd, 'resolve'));
                assert.deepEqual(config.src, [join(cwd, 'src-1'), join(cwd, 'src-2')]);
                assert.equal(config.tempDirectory, join(cwd, 'temp-directory'));
            },
        );

        it
        (
            'resolves `cwd` to a path when specified as a URL',
            async () =>
            {
                const expected = tmpdir();
                const { cwd: actual } = await resolveOptions({ cwd: pathToFileURL(expected) });
                assert.equal(actual, expected);
            },
        );

        it
        (
            'throws an error if `cwd` is not an absolute path',
            async () =>
            {
                await assert.rejects(resolveOptions({ cwd: '.' }), { constructor: Error });
            },
        );

        it
        (
            'does not cache c8 options in package.json',
            async () =>
            {
                const [actualA, actualB] =
                await Promise.all
                (
                    [
                        resolveOptions({ cwd: joinPath('test/fixtures/config/packages/a') }),
                        resolveOptions({ cwd: joinPath('test/fixtures/config/packages/b') }),
                    ],
                );
                assert.equal(actualA.exclude, 'a');
                assert.equal(actualB.exclude, 'b');
            },
        );
    },
);

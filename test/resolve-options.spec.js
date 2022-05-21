/* eslint-env mocha */

import resolveOptions       from '../lib/resolve-options.js';
import { joinPath }         from './utils.js';
import { strict as assert } from 'assert';
import { tmpdir }           from 'os';
import { join }             from 'path';
import { pathToFileURL } from 'url';

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

        it
        (
            'throws an error if the configuration file is invalid',
            async () =>
            {
                const c8Config = joinPath('test/fixtures/config/invalid');
                await assert.rejects
                (
                    resolveOptions({ c8Config }),
                    {
                        message:
                        `Unable to parse file '${c8Config
                        }': Unexpected token * in JSON at position 1`,
                    },
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
                        resolve: 'resolve',
                        src: ['src-1', 'src-2'],
                        tempDirectory: 'temp-directory',
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
    },
);

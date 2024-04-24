/* eslint-env mocha */

import resolveCommand       from '../lib/resolve-command.js';
import { strict as assert } from 'assert';

describe
(
    'resolveCommand',
    () =>
    {
        describe
        (
            'on Unix',
            () =>
            {
                it
                (
                    'works',
                    async () =>
                    {
                        const expectedPath = '/usr/local/bin/npm';
                        const actualPath =
                        await resolveCommand
                        (
                            'npm',
                            () => expectedPath,
                            { __proto__: process, platform: 'linux' },
                        );
                        assert.equal(actualPath, expectedPath);
                    },
                );
            },
        );

        describe
        (
            'on Windows',
            () =>
            {
                it
                (
                    'works when `which` returns a .cmd file path',
                    async () =>
                    {
                        const expectedPath =
                        'C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js';
                        const actualPath =
                        await resolveCommand
                        (
                            'npm',
                            () => 'C:\\Program Files\\nodejs\\npm.CMD',
                            { __proto__: process, platform: 'win32' },
                        );
                        assert.equal(actualPath, expectedPath);
                    },
                );

                it
                (
                    'works when `which` returns the path of a file without extension',
                    async () =>
                    {
                        const expectedPath = 'C:\\Program Files\\nodejs\\npm';
                        const actualPath =
                        await resolveCommand
                        (
                            'npm',
                            () => expectedPath,
                            { __proto__: process, platform: 'win32' },
                        );
                        assert.equal(actualPath, expectedPath);
                    },
                );
            },
        );
    },
);

/* eslint-env mocha */

import { createTempDirectory, joinPath }    from './utils.js';
import assert                               from 'node:assert/strict';
import { createRequire }                    from 'node:module';

describe
(
    'CommonJS module',
    () =>
    {
        function require_c8js()
        {
            const require = createRequire(import.meta.url);
            const c8js = require('c8js');
            return c8js;
        }

        it
        (
            'looks like ES module',
            async () =>
            {
                function isObject(value)
                {
                    return value === Object(value);
                }

                function verifyDeep(name, actual, expected)
                {
                    verifyShallow(name, actual, expected);
                    if (!isObject(expected))
                        return;
                    const actualKeys = Object.getOwnPropertyNames(actual);
                    const expectedKeys = Object.getOwnPropertyNames(expected);
                    assert.deepEqual
                    (actualKeys, expectedKeys, `Object.getOwnPropertyNames(${name})`);
                    for (const key of expectedKeys)
                        verifyKeys(name, actual, expected, key);
                }

                function verifyKeys(name, actual, expected, key)
                {
                    const actualDescriptor = Object.getOwnPropertyDescriptor(actual, key);
                    const expectedDescriptor = Object.getOwnPropertyDescriptor(expected, key);
                    const baseMessage =
                    `Object.getOwnPropertyDescriptor(${name}, ${JSON.stringify(key)})`;
                    assert.equal
                    (
                        actualDescriptor.configurable,
                        expectedDescriptor.configurable,
                        `${baseMessage}.configurable`,
                    );
                    assert.equal
                    (
                        actualDescriptor.enumerable,
                        expectedDescriptor.enumerable,
                        `${baseMessage}.enumerable`,
                    );
                    assert.equal
                    (
                        typeof actualDescriptor.get,
                        typeof expectedDescriptor.get,
                        `${baseMessage}.get`,
                    );
                    assert.equal
                    (
                        typeof actualDescriptor.set,
                        typeof expectedDescriptor.set,
                        `${baseMessage}.set`,
                    );
                    verifyDeep(`${name}.${key}`, actualDescriptor.value, expectedDescriptor.value);
                    assert.equal
                    (
                        actualDescriptor.writable,
                        expectedDescriptor.writable,
                        `${baseMessage}.writable`,
                    );
                }

                function verifyShallow(name, actual, expected)
                {
                    if (isObject(expected))
                    {
                        assert.notEqual(actual, expected, name);
                        assert(isObject(actual), `isObject(${name})`);
                        assert.equal(typeof actual, typeof expected, `typeof ${name}`);
                        assert.equal
                        (
                            Object.getPrototypeOf(actual),
                            Object.getPrototypeOf(expected),
                            `Object.getPrototypeOf(${name})`,
                        );
                        assert.equal
                        (
                            Object.isExtensible(actual),
                            Object.isExtensible(expected),
                            `Object.isExtensible(${name})`,
                        );
                    }
                    else
                        assert.equal(actual, expected, name);
                }

                const actualModule = require_c8js();
                const expectedModule = await import('c8js');
                const actualKeys = Object.keys(actualModule);
                const expectedKeys = Object.keys(expectedModule).filter(key => key !== 'default');
                const expectedDefaultExport = expectedModule.default;
                verifyShallow('c8js', actualModule, expectedDefaultExport);
                verifyKeys('c8js', actualModule, expectedDefaultExport, 'length');
                verifyKeys('c8js', actualModule, expectedDefaultExport, 'name');
                assert.equal
                (
                    Object.getOwnPropertyDescriptor(actualModule, 'prototype'),
                    Object.getOwnPropertyDescriptor(expectedDefaultExport, 'prototype'),
                );
                assert.deepEqual(actualKeys, expectedKeys);
                for (const key of expectedKeys)
                {
                    const actualExport = actualModule[key];
                    const expectedExport = expectedModule[key];
                    verifyDeep(`c8js.${key}`, actualExport, expectedExport);
                }
            },
        );

        it
        (
            '`c8js`',
            async () =>
            {
                const c8js = require_c8js();
                const tempDirectory = await createTempDirectory();
                const result =
                await c8js
                (
                    c8js.commands.node,
                    ['-v'],
                    { reporter: [], silent: true, tempDirectory },
                );
                assert.equal(result.status, 0);
                assert.equal(result.signal, null);
                assert.equal(result.output[0], null);
                assert(/^v\d+\.\d+\.\d+\s*$/.test(result.output[1]));
                assert.equal(result.output[2], '');
                assert(typeof result.pid === 'number');
                assert(/^v\d+\.\d+\.\d+\s*$/.test(result.stdout));
                assert.equal(result.stderr, '');
                assert.equal(result.error, null);
                assert.deepEqual(result.coverageMap.data, { __proto__: null });
            },
        );

        it
        (
            '`checkCoverage`',
            async () =>
            {
                const c8js = require_c8js();
                const tempDirectory = await createTempDirectory();
                const options =
                {
                    100:        true,
                    exclude:    [],
                    tempDirectory,
                };
                await c8js.exec(joinPath('test/fixtures/thresholds/50-percent.js'), options);
                await assert.rejects(c8js.checkCoverage(options), { code: 'LOW_COVERAGE' });
            },
        );

        describe
        (
            '`commands`',
            () =>
            {
                async function testCommand(command)
                {
                    const { commands: actualCommands } = require_c8js();
                    const { commands: expectedCommands } = await import('c8js');
                    const actualPath = await actualCommands[command];
                    const expectedPath = await expectedCommands[command];
                    assert.equal(actualPath, expectedPath);
                }

                it('`node`', async () => await testCommand('node'));

                it('`npm`', async () => await testCommand('npm'));

                it('`npx`', async () => await testCommand('npx'));
            },
        );

        it
        (
            '`exec`',
            async () =>
            {
                const c8js = require_c8js();
                const tempDirectory = await createTempDirectory();
                const options = { silent: true, tempDirectory };
                const { stdout } = await c8js.exec(c8js.commands.node, ['-v'], options);
                assert(/^v\d+\.\d+\.\d+\s*$/.test(stdout));
            },
        );

        it
        (
            '`report`',
            async () =>
            {
                const c8js = require_c8js();
                const reportsDirectory = await createTempDirectory();
                const options = { reporter: [], reportsDirectory };
                await c8js.exec(c8js.commands.node, ['-e', '""'], options);
                const coverageMap = await c8js.report(options);
                assert.deepEqual(coverageMap.data, { __proto__: null });
            },
        );
    },
);

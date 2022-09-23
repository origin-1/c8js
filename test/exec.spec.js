/* eslint-env mocha */

import { assertStackTraceConnected, createTempDirectory, joinPath } from './utils.js';
import { strict as assert }                                         from 'assert';
import c8js, { version as c8js_version, commands }                  from 'c8js';

describe
(
    'function `exec`',
    () =>
    {
        let tempDirectory;

        beforeEach
        (
            async () =>
            {
                tempDirectory = await createTempDirectory();
            },
        );

        it
        (
            'throws an error if the command does not exist',
            async () =>
            {
                await assert.rejects
                (
                    c8js.exec
                    (
                        joinPath('test/fixtures/not-found'),
                        { silent: true, tempDirectory },
                    ),
                    ({ code, stack }) =>
                    {
                        assert(code === 'ENOENT');
                        assertStackTraceConnected(stack);
                        return true;
                    },
                );
            },
        );

        it
        (
            'throws an error if the command is a directory',
            async () =>
            {
                await assert.rejects
                (
                    c8js.exec
                    (
                        joinPath('test/fixtures'),
                        { silent: true, tempDirectory },
                    ),
                    ({ code, stack }) =>
                    {
                        assert(code === 'EACCES' || code === 'ENOENT');
                        assertStackTraceConnected(stack);
                        return true;
                    },
                );
            },
        );

        it
        (
            'throws an error if the command is an empty file',
            async () =>
            {
                await assert.rejects
                (
                    c8js.exec
                    (
                        joinPath('test/fixtures/empty'),
                        { silent: true, tempDirectory },
                    ),
                    ({ code, stack }) =>
                    {
                        assert(code === 'EACCES' || code === 'ENOENT');
                        assertStackTraceConnected(stack);
                        return true;
                    },
                );
            },
        );

        describe
        (
            'reports a process that failed with an exit code',
            () =>
            {
                it
                (
                    'without option `throwExecError`',
                    async () =>
                    {
                        await assert.rejects
                        (
                            c8js.exec
                            (
                                process.execPath,
                                ['not-found'],
                                { cwd: joinPath('test/fixtures'), silent: true, tempDirectory },
                            ),
                            ({ code, constructor, killed, signal, stack }) =>
                            {
                                assert.equal(code, 1);
                                assert.equal(constructor, Error);
                                assert.equal(killed, false);
                                assert.equal(signal, null);
                                assertStackTraceConnected(stack);
                                return true;
                            },
                        );
                    },
                );

                it
                (
                    'with option `throwExecError` set to \'never\'',
                    async () =>
                    {
                        const result =
                        await c8js.exec
                        (
                            process.execPath,
                            ['not-found'],
                            {
                                cwd: joinPath('test/fixtures'),
                                silent: true,
                                tempDirectory,
                                throwExecError: 'never',
                            },
                        );
                        assert.equal(result.status, 1);
                        assert.equal(result.signal, null);
                        assert(Array.isArray(result.output));
                        assert.equal(result.output.length, 3);
                        assert.equal(result.output[0], null);
                        assert.equal(result.output[1], '');
                        assert.equal(typeof result.output[2], 'string');
                        assert(result.error instanceof Error);
                        assertStackTraceConnected(result.error.stack);
                        assert.equal(result.stdout, '');
                        assert.equal(typeof result.stderr, 'string');
                    },
                );
            },
        );

        describe
        (
            'produces expected output',
            () =>
            {
                async function testEncoding(encoding, expectedStdout, expectedStderr)
                {
                    const { stderr: actualStderr, stdout: actualStdout } =
                    await c8js.exec
                    (
                        joinPath('test/fixtures/encoding-test.js'),
                        { encoding, silent: true, tempDirectory },
                    );
                    assert.deepEqual(actualStdout, expectedStdout);
                    assert.deepEqual(actualStderr, expectedStderr);
                }

                it
                (
                    'with `buffer` encoding',
                    () =>
                    testEncoding
                    (
                        'buffer',
                        Buffer.from('\x1b[31mE = mc²\x1b[0m\n'),
                        Buffer.from('Something went 😕\n'),
                    ),
                );

                it
                (
                    'with `utf8` encoding',
                    () => testEncoding('utf8', '\x1b[31mE = mc²\x1b[0m\n', 'Something went 😕\n'),
                );

                it
                (
                    'with `ascii` encoding',
                    () =>
                    testEncoding
                    ('ascii', '\x1b[31mE = mcB2\x1b[0m\n', 'Something went p\x1f\x18\x15\n'),
                );
            },
        );

        describe
        (
            'respects option `maxBuffer`',
            () =>
            {
                async function testMaxBuffer(streamName, encoding, expected)
                {
                    const { [streamName]: actual, error } =
                    await c8js.exec
                    (
                        joinPath(`test/fixtures/${streamName}-max-buffer-test.js`),
                        {
                            encoding,
                            maxBuffer: 17,
                            silent: true,
                            tempDirectory,
                            throwExecError: 'never',
                        },
                    );
                    assert.deepEqual(actual, expected);
                    assert.equal(error.code, 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER');
                    assert.equal(error.constructor, RangeError);
                    assertStackTraceConnected(error.stack);
                }

                it
                (
                    'on stdout with `buffer` encoding',
                    () =>
                    testMaxBuffer
                    (
                        'stdout',
                        'buffer',
                        Buffer.concat([Buffer.from('l\'archiviazione '), Buffer.from([195])]),
                    ),
                );

                it
                (
                    'on stdout with `utf8` encoding',
                    () => testMaxBuffer('stdout', 'utf8', 'l\'archiviazione è'),
                );

                it
                (
                    'on stdout with `ascii` encoding',
                    () => testMaxBuffer('stdout', 'ascii', 'l\'archiviazione C'),
                );

                it
                (
                    'on stdout with value `Infinity`',
                    async () =>
                    {
                        const { stdout } =
                        await c8js.exec
                        (
                            joinPath('test/fixtures/stdout-max-buffer-test.js'),
                            { maxBuffer: Infinity, silent: true, tempDirectory },
                        );
                        assert.equal(stdout, 'l\'archiviazione è riuscita\n');
                    },
                );

                it
                (
                    'on stderr with `buffer` encoding',
                    () =>
                    testMaxBuffer
                    (
                        'stderr',
                        'buffer',
                        Buffer.concat([Buffer.from('es liegt eine St'), Buffer.from([195])]),
                    ),
                );

                it
                (
                    'on stderr with `utf8` encoding',
                    () => testMaxBuffer('stderr', 'utf8', 'es liegt eine Stö'),
                );

                it
                (
                    'on stderr with `ascii` encoding',
                    () => testMaxBuffer('stderr', 'ascii', 'es liegt eine StC'),
                );

                it
                (
                    'on stderr with value `Infinity`',
                    async () =>
                    {
                        const { stderr } =
                        await c8js.exec
                        (
                            joinPath('test/fixtures/stderr-max-buffer-test.js'),
                            { maxBuffer: Infinity, silent: true, tempDirectory },
                        );
                        assert.equal(stderr, 'es liegt eine Störung vor\n');
                    },
                );
            },
        );

        describe
        (
            'with option `timeout`',
            () =>
            {
                it
                (
                    'times out',
                    async () =>
                    {
                        const { error, output, signal, status, stderr, stdout } =
                        await c8js.exec
                        (
                            joinPath('test/fixtures/timeout-test.js'),
                            { silent: true, tempDirectory, throwExecError: 'never', timeout: 1 },
                        );
                        assert.equal(status, null);
                        assert.equal(signal, 'SIGTERM');
                        assert(Array.isArray(output));
                        assert.equal(output.length, 3);
                        assert.equal(output[0], null);
                        assert.equal(output[1], '');
                        assert.equal(output[2], '');
                        assert(error instanceof Error);
                        assert.equal(error.code, null);
                        assert.equal(error.killed, true);
                        assert.equal(error.signal, 'SIGTERM');
                        assertStackTraceConnected(error.stack);
                        assert.equal(stdout, '');
                        assert.equal(stderr, '');
                    },
                );

                it
                (
                    'does not time out',
                    async () =>
                    {
                        await c8js.exec
                        (
                            joinPath('test/fixtures/noop.js'),
                            { tempDirectory, timeout: 1000 },
                        );
                    },
                );
            },
        );

        describe
        (
            'respects option `killSignal` in lowercase',
            () =>
            {
                it
                (
                    'with option `timeout`',
                    async () =>
                    {
                        const { signal } =
                        await c8js.exec
                        (
                            joinPath('test/fixtures/timeout-test.js'),
                            {
                                killSignal: 'sigint',
                                silent: true,
                                tempDirectory,
                                throwExecError: 'never',
                                timeout: 1,
                            },
                        );
                        assert.equal(signal, 'SIGINT');
                    },
                );

                it
                (
                    'with option `maxBuffer`',
                    async () =>
                    {
                        const { signal } =
                        await c8js.exec
                        (
                            joinPath('test/fixtures/stdout-max-buffer-test.js'),
                            {
                                killSignal: 'sigint',
                                maxBuffer: 17,
                                silent: true,
                                tempDirectory,
                                throwExecError: 'never',
                            },
                        );
                        assert.equal(signal, 'SIGINT');
                    },
                );
            },
        );

        describe
        (
            'throws an error if an option has an invalid value',
            () =>
            {
                async function testInvalidOption
                (options, expectedErrorConstructor, expectedErrorCode)
                {
                    await assert.rejects
                    (
                        c8js.exec(joinPath('test/fixtures/noop.js'), { tempDirectory, ...options }),
                        error =>
                        {
                            assert(error instanceof expectedErrorConstructor);
                            assert.equal(error.code, expectedErrorCode);
                            assertStackTraceConnected(error.stack);
                            return true;
                        },
                    );
                }

                it
                (
                    'option `gid` is not a number',
                    () => testInvalidOption({ gid: 'foo' }, TypeError, 'ERR_INVALID_ARG_TYPE'),
                );

                it
                (
                    'option `gid` is not a number with `throwExecError` set to \'never\'',
                    () =>
                    testInvalidOption
                    ({ gid: 'foo', throwExecError: 'never' }, TypeError, 'ERR_INVALID_ARG_TYPE'),
                );

                it
                (
                    'option `killSignal` is not a number or string',
                    () => testInvalidOption({ killSignal: 1n }, TypeError, 'ERR_INVALID_ARG_TYPE'),
                );

                it
                (
                    'option `killSignal` is not a number or string with `throwExecError` set to ' +
                    '\'never\'',
                    () =>
                    testInvalidOption
                    (
                        { killSignal: 1n, throwExecError: 'never' },
                        TypeError,
                        'ERR_INVALID_ARG_TYPE',
                    ),
                );

                it
                (
                    'option `maxBuffer` is not a non-negative number',
                    () => testInvalidOption({ maxBuffer: -1 }, RangeError, 'ERR_OUT_OF_RANGE'),
                );

                it
                (
                    'option `maxBuffer` is not a non-negative number with `throwExecError` set ' +
                    'to \'never\'',
                    () =>
                    testInvalidOption
                    ({ maxBuffer: -1, throwExecError: 'never' }, RangeError, 'ERR_OUT_OF_RANGE'),
                );

                it
                (
                    'option `timeout` is not an unsigned integer',
                    () => testInvalidOption({ timeout: NaN }, RangeError, 'ERR_OUT_OF_RANGE'),
                );

                it
                (
                    'option `timeout` is not an unsigned integer with `throwExecError` set to ' +
                    '\'never\'',
                    () =>
                    testInvalidOption
                    ({ timeout: NaN, throwExecError: 'never' }, RangeError, 'ERR_OUT_OF_RANGE'),
                );

                it
                (
                    'option `uid` is not a number',
                    () => testInvalidOption({ uid: 'foo' }, TypeError, 'ERR_INVALID_ARG_TYPE'),
                );

                it
                (
                    'option `uid` is not a number with `throwExecError` set to \'never\'',
                    () =>
                    testInvalidOption
                    ({ uid: 'foo', throwExecError: 'never' }, TypeError, 'ERR_INVALID_ARG_TYPE'),
                );
            },
        );

        it
        (
            'inherits the environment from the current process',
            async () =>
            {
                const expectedEnv = { COLORTERM: '🔴🟢🔵', FOO: '12345', LANG: undefined };
                const { stdout } =
                await c8js.exec
                (
                    joinPath('test/fixtures/dump-env.js'),
                    { env: expectedEnv, silent: true, tempDirectory },
                );
                const actualEnv = JSON.parse(stdout);
                assert.equal(actualEnv.COLORTERM, expectedEnv.COLORTERM);
                assert.equal(actualEnv.FOO, expectedEnv.FOO);
                assert.equal(actualEnv.LANG, expectedEnv.LANG);
                assert.equal(actualEnv.USER, process.env.USER);
                assert.equal(actualEnv.USERNAME, process.env.USERNAME);
                assert.equal(actualEnv.c8js_version, c8js_version);
            },
        );

        it
        (
            'runs a JavaScript module with a hashbang',
            async () =>
            {
                await c8js.exec
                (
                    joinPath('test/fixtures/hashbang-test'),
                    { tempDirectory },
                );
            },
        );

        it
        (
            'runs node',
            async () =>
            {
                await c8js.exec
                (
                    commands.node,
                    ['-v'],
                    { silent: true, tempDirectory },
                );
            },
        );

        it
        (
            'runs npm',
            async () =>
            {
                await c8js.exec
                (
                    commands.npm,
                    ['-v'],
                    { silent: true, tempDirectory },
                );
            },
        );

        it
        (
            'runs npx',
            async () =>
            {
                await c8js.exec
                (
                    commands.npx,
                    ['-v'],
                    { silent: true, tempDirectory },
                );
            },
        );
    },
);

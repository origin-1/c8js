/* eslint-env mocha */

import fgExecAsync, { SIGNALS } from '../lib/foreground-exec-async.js';
import { joinPath }             from './utils.js';
import { strict as assert }     from 'assert';

function isKiller(listener)
{
    try
    {
        listener();
        return true;
    }
    catch (error)
    {
        if (error.code === 'ENOSYS' || error.code === 'ERR_UNKNOWN_SIGNAL')
            return false;
        throw error;
    }
}

describe
(
    'fgExecAsync',
    () =>
    {
        describe
        (
            'kills a child if the parent exits',
            () =>
            {
                async function testExitParent(platform)
                {
                    const modulePath = joinPath('test/fixtures/timeout-test');
                    let childHangup;
                    const addListener =
                    (type, listener) =>
                    {
                        if (type === 'exit')
                            childHangup = listener;
                        process.addListener(type, listener);
                    };
                    const resultPromise =
                    fgExecAsync
                    (
                        process.execPath,
                        [modulePath],
                        { failFast: true },
                        { __proto__: process, addListener, platform },
                    );
                    if (isKiller(childHangup))
                    {
                        await assert.rejects
                        (
                            resultPromise,
                            {
                                code: null,
                                constructor: Error,
                                killed: true,
                                signal: platform !== 'win32' ? 'SIGHUP' : 'SIGTERM',
                            },
                        );
                    }
                }

                it
                (
                    'on the current OS',
                    async () =>
                    {
                        await testExitParent(process.platform);
                    },
                );

                it
                (
                    'on Windows',
                    async function ()
                    {
                        const { platform } = process;
                        if (platform === 'win32')
                            this.skip();
                        await testExitParent('win32');
                    },
                );

                it
                (
                    'on Linux',
                    async function ()
                    {
                        const { platform } = process;
                        if (platform === 'linux')
                            this.skip();
                        await testExitParent('linux');
                    },
                );
            },
        );

        it
        (
            'kills a child if the parent is killed',
            async () =>
            {
                const modulePath = joinPath('test/fixtures/timeout-test');
                const signalMap = new Map();
                const addListener =
                (type, listener) =>
                {
                    if (SIGNALS.includes(type))
                        signalMap.set(type, listener);
                    process.addListener(type, listener);
                };
                const resultPromise =
                fgExecAsync
                (
                    process.execPath,
                    [modulePath],
                    { failFast: false },
                    { __proto__: process, addListener },
                );
                assert.deepEqual([...signalMap.keys()], SIGNALS);
                const killerSignals = SIGNALS.filter(signal => isKiller(signalMap.get(signal)));
                const result = await resultPromise;
                assert.equal(result.status, null);
                assert(killerSignals.includes(result.signal));
                assert(result.error instanceof Error);
            },
        );
    },
);

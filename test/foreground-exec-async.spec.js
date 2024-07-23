/* eslint-env mocha */

import assert               from 'node:assert/strict';
import fgExecAsync          from '../lib/foreground-exec-async.js';
import { joinPath }         from './utils.js';

describe
(
    'fgExecAsync',
    () =>
    {
        it
        (
            'kills a child if the parent exits',
            async () =>
            {
                const modulePath = joinPath('test/fixtures/timeout-test');
                const killSignal = 'SIGINT';
                let killChild;
                const addListener =
                (type, listener) =>
                {
                    if (type === 'exit')
                        killChild = listener;
                    process.addListener(type, listener);
                };
                const resultPromise =
                fgExecAsync
                (
                    process.execPath,
                    [modulePath],
                    { failFast: true, killSignal },
                    { __proto__: process, addListener },
                );
                killChild();
                await assert.rejects
                (
                    resultPromise,
                    { code: null, constructor: Error, killed: true, signal: killSignal },
                );
            },
        );
    },
);

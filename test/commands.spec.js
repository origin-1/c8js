/* eslint-env mocha */

import assert       from 'node:assert/strict';
import { commands } from 'c8js';

describe
(
    'property `commands`',
    () =>
    {
        it
        (
            'is frozen',
            () =>
            {
                assert(Object.isFrozen(commands));
            },
        );
    },
);

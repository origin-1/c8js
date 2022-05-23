/* eslint-env mocha */

import { strict as assert } from 'assert';
import { commands }         from 'c8js';

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

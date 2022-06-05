#!/usr/bin/env node

import c8js from 'c8js';

await c8js
(
    'node_modules/mocha/bin/mocha.js',
    ['--check-leaks', '--timeout=10000', 'test/*.spec.js'],
    {
        all: true,
        cwd: new URL('..', import.meta.url),
        reporter: ['html', 'text-summary'],
        src: 'lib',
        useC8Config: false,
        watermarks:
        {
            branches:   [90, 100],
            functions:  [90, 100],
            lines:      [90, 100],
            statements: [90, 100],
        },
    },
);

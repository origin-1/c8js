#!/usr/bin/env node

import { lint }             from '@fasttime/lint';
import { fileURLToPath }    from 'url';

process.chdir(fileURLToPath(new URL('..', import.meta.url)));
await lint
(
    {
        src: '{lib,test}/*.{js,ts}',
        env: { node: true },
        parserOptions: { ecmaVersion: 2020, project: 'tsconfig.json', sourceType: 'module' },
    },
    {
        src: 'dev/*.js',
        env: { node: true },
        parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
    },
);

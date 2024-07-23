import { createFlatConfig } from '@origin-1/eslint-config';
import globals              from 'globals';

export default createFlatConfig
(
    {
        ignores: ['**/.*', 'coverage', 'test/fixtures', 'tmp'],
    },
    {
        files:      ['**/*.cjs', '**/*.js'],
        jsVersion:  2021,
    },
    {
        files:              ['**/*.ts'],
        tsVersion:          'latest',
        languageOptions:    { parserOptions: { project: 'tsconfig.json' } },
    },
    {
        languageOptions: { globals: { ...globals.nodeBuiltin } },
    },
    {
        files:      ['dev/*.js'],
        jsVersion:  2022,
    },
    {
        files:              ['test/*.spec.js'],
        languageOptions:    { globals: { ...globals.mocha } },
    },
);

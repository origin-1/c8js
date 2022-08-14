const { createConfig } = require('@origin-1/eslint-config');

module.exports =
createConfig
(
    {
        files: ['*.cjs', '*.js'],
        jsVersion: 2020,
        env: { node: true },
        parserOptions: { sourceType: 'module' },
    },
    {
        files: '*.ts',
        tsVersion: 'latest',
        env: { node: true },
        parserOptions: { project: 'tsconfig.json' },
    },
    {
        files: 'dev/*.js',
        jsVersion: 2022,
        env: { node: true },
        parserOptions: { sourceType: 'module' },
    },
);

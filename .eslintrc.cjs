const { createConfig } = require('@origin-1/eslint-config');

module.exports =
createConfig
(
    {
        files:          ['*.cjs', '*.js'],
        jsVersion:      2020,
        parserOptions:  { sourceType: 'module' },
    },
    {
        files:          '*.ts',
        tsVersion:      'latest',
        parserOptions:  { project: 'tsconfig.json' },
    },
    {
        files:          ['*.cjs', '*.js', '*.ts'],
        env:            { node: true },
    },
    {
        files:          'dev/*',
        jsVersion:      2022,
    },
);

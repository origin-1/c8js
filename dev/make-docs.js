#!/usr/bin/env node

import { copyFile, writeFile }          from 'fs/promises';
import { Application, TSConfigReader }  from 'typedoc';
import { fileURLToPath }                from 'url';

process.chdir(fileURLToPath(new URL('..', import.meta.url)));
const docsDirName = 'docs';
const options =
{
    disableSources:     true,
    entryPoints:        'lib/c8js.d.ts',
    excludeExternals:   true,
    githubPages:        false,
    hideBreadcrumbs:    true,
    name:               'c8js',
    plugin:             'typedoc-plugin-markdown',
    tsconfig:           'tsconfig.json',
};
const tsConfigReader = new TSConfigReader();
const app = await Application.bootstrapWithPlugins(options, [tsConfigReader]);
const project = await app.convert();
app.validate(project);
const { logger } = app;
if (logger.hasErrors() || logger.hasWarnings())
    throw Error('Problems occurred while generating the documentation');
await app.renderer.render(project, docsDirName);
const promises = [];
if (!process.argv.includes('--no-gitignore', 2))
    promises.push(writeFile(`${docsDirName}/.gitignore`, '*\n'));
const srcFileName = 'comparison.svg';
const destFileName = `${docsDirName}/${srcFileName}`;
promises.push(copyFile(srcFileName, destFileName));
await promises;

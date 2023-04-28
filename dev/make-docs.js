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
const app = new Application();
app.options.addReader(new TSConfigReader());
await app.bootstrapWithPlugins(options);
const project = app.convert();
await app.renderer.render(project, docsDirName);
if (app.logger.hasErrors())
    throw Error('Error generating documentation');
const promises = [];
if (!process.argv.includes('--no-gitignore', 2))
    promises.push(writeFile(`${docsDirName}/.gitignore`, '*\n'));
const srcFileName = 'comparison.svg';
const destFileName = `${docsDirName}/${srcFileName}`;
promises.push(copyFile(srcFileName, destFileName));
await promises;

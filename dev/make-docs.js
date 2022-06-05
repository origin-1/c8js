#!/usr/bin/env node

import { writeFile }                    from 'fs/promises';
import { Application, TSConfigReader }  from 'typedoc';
import { fileURLToPath }                from 'url';

process.chdir(fileURLToPath(new URL('..', import.meta.url)));
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
app.bootstrap(options);
const project = app.convert();
await app.renderer.render(project, 'docs');
if (app.logger.hasErrors())
    throw Error('Error generating documentation');
if (!process.argv.includes('--no-gitignore', 2))
    await writeFile('docs/.gitignore', '*\n');

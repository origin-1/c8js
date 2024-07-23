import { mkdir, rm }        from 'node:fs/promises';
import { createRequire }    from 'node:module';
import { relative }         from 'node:path';

const MKDIR_OPTIONS = { recursive: true };

const RM_OPTIONS = { force: true, recursive: true };

let require = createRequire(import.meta.url);

export const { version: c8js_version } = require('c8js/package.json');

export const createDirectory = path => mkdir(path, MKDIR_OPTIONS);

export const deleteDirectory = path => rm(path, RM_OPTIONS);

export const requireAsC8 =
(() =>
{
    const c8PackagePath = require.resolve('c8/package.json');
    const requireAsC8 = createRequire(c8PackagePath);
    return requireAsC8;
}
)();

export function standardizePath(path, cwd)
{
    const standardPath = relative(cwd, path).replaceAll('\\', '/'); // standardize path for Windows.
    return standardPath;
}

require = null;

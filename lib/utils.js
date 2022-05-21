import fsPromises, { mkdir }    from 'fs/promises';
import { createRequire }        from 'module';
import { relative }             from 'path';

const MKDIR_OPTIONS = { recursive: true };

const RM_OPTIONS = { force: true, recursive: true };

let require = createRequire(import.meta.url);

export const { version: c8js_version } = require('c8js/package.json');

export const createDirectory = path => mkdir(path, MKDIR_OPTIONS);

export const deleteDirectory =
(() =>
{
    const rm = fsPromises.rm /* c8 ignore next */ ?? fsPromises.rmdir;
    const deleteDirectory = path => rm(path, RM_OPTIONS);
    return deleteDirectory;
}
)();

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
    const standardPath = relative(cwd, path).replace(/\\/g, '/'); // standardize path for Windows.
    return standardPath;
}

require = null;

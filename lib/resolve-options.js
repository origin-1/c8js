import parseConfig                                              from './parse-config.js';
import { requireAsC8 }                                          from './utils.js';
import { isAbsolute, join, normalize, resolve as resolvePath }  from 'path';
import { fileURLToPath }                                        from 'url';

const defaultExclude    = requireAsC8('@istanbuljs/schema/default-exclude.js');
const defaultExtension  = requireAsC8('@istanbuljs/schema/default-extension.js');

const defaultOpts =
{
    // Common
    // cwd:                undefined, // process.cwd()
    // reportsDirectory:   'coverage',
    // tempDirectory:      undefined, // resolvePath(reportsDirectory, 'tmp')

    // exec options
    clean:              true,
    encoding:           'utf8',
    env:                undefined, // { }
    gid:                undefined,
    killSignal:         undefined, // 'SIGTERM'
    maxBuffer:          undefined, // 1024 * 1024
    silent:             false,
    throwExecError:     'early',
    timeout:            undefined, // 0
    uid:                undefined,

    // report options
    checkCoverage:      false,
    // reporter:           'text',
    skipFull:           false,
    watermarks:         undefined,

    // checkCoverage options
    // 100:                false,
    all:                false,
    allowExternal:      false,
    branches:           0,
    exclude:            defaultExclude,
    excludeAfterRemap:  false,
    excludeNodeModules: true,
    extension:          defaultExtension,
    functions:          0,
    include:            [],
    lines:              90,
    omitRelative:       true,
    perFile:            false,
    // resolve:            '',
    // src:                undefined,
    statements:         0,
    wrapperLength:      undefined,
};

const isDefaultSetting = value => value == null;

export default async function resolveOptions(inlOpts = { })
{
    let { cwd } = inlOpts;
    if (isDefaultSetting(cwd))
        cwd = process.cwd();
    else
    {
        if (typeof cwd !== 'string')
            cwd = fileURLToPath(cwd);
        if (!isAbsolute(cwd))
            throw Error('Option \'cwd\' must be an absolute path');
        cwd = normalize(cwd);
    }

    let { useC8Config } = inlOpts;
    if (isDefaultSetting(useC8Config))
        useC8Config = true;
    let cfgOpts;
    if (useC8Config)
    {
        let { c8Config } = inlOpts;
        if (isDefaultSetting(c8Config))
            c8Config = undefined;
        else
            c8Config = resolvePath(cwd, c8Config);
        cfgOpts = await parseConfig(cwd, c8Config);
    }
    const getOption = key => key in inlOpts ? inlOpts[key] : cfgOpts?.[key];

    let reportsDirectory = getOption('reportsDirectory');
    if (isDefaultSetting(reportsDirectory))
        reportsDirectory = 'coverage';
    reportsDirectory = resolvePath(cwd, reportsDirectory);

    let tempDirectory = getOption('tempDirectory');
    if (isDefaultSetting(tempDirectory))
        tempDirectory = join(reportsDirectory, 'tmp');
    else
        tempDirectory = resolvePath(cwd, tempDirectory);

    let reporter = getOption('reporter');
    if (isDefaultSetting(reporter))
        reporter = ['text'];
    else if (!Array.isArray(reporter))
        reporter = [reporter];

    let resolve = getOption('resolve');
    if (isDefaultSetting(resolve))
        resolve = '';
    resolve = resolvePath(cwd, resolve);

    let src = getOption('src');
    if (isDefaultSetting(src))
        src = '';
    src = resolvePaths(cwd, src);

    const resOpts = { cwd, reporter, reportsDirectory, resolve, src, tempDirectory };
    for (const [key, defaultValue] of Object.entries(defaultOpts))
    {
        let value = getOption(key);
        if (isDefaultSetting(value))
            value = defaultValue;
        resOpts[key] = value;
    }

    if (getOption(100))
    {
        resOpts.checkCoverage = true;
        resOpts.branches = resOpts.functions = resOpts.lines = resOpts.statements = 100;
    }

    return resOpts;
}

function resolvePaths(base, path)
{
    const returnValue =
    Array.isArray(path) ? path.map(path => resolvePath(base, path)) : resolvePath(base, path);
    return returnValue;
}

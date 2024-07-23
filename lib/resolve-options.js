import { isAbsolute, join, normalize, resolve as resolvePath }  from 'node:path';
import { fileURLToPath }                                        from 'node:url';
import parseConfig                                              from './parse-config.js';
import { requireAsC8 }                                          from './utils.js';

const defaultExclude    = requireAsC8('@istanbuljs/schema/default-exclude.js');
const defaultExtension  = requireAsC8('@istanbuljs/schema/default-extension.js');

const DEFAULT_OPTS =
{
    // *Common options*
    // c8Config
    // cwd
    // reportsDirectory
    // tempDirectory
    // useC8Config

    // *exec options*
    clean:              true,
    encoding:           'utf8',
    env:                undefined, // { }
    gid:                undefined,
    killSignal:         undefined, // 'SIGTERM'
    maxBuffer:          undefined, // 1024 * 1024
    silent:             false,
    throwExecError:     undefined, // 'early'
    timeout:            undefined, // 0
    uid:                undefined,

    // *report options*
    checkCoverage:      false,
    // reporter
    reporterOptions:    undefined, // { }
    skipFull:           false,
    watermarks:         undefined,

    // *checkCoverage options*
    // 100
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
    mergeAsync:         false,
    omitRelative:       true,
    perFile:            false,
    // resolve
    // src
    statements:         0,
    wrapperLength:      undefined,
};

const KNOWN_OPTION_SET =
new Set
(
    [
        '100',
        'c8Config',
        'cwd',
        'reporter',
        'reportsDirectory',
        'resolve',
        'src',
        'tempDirectory',
        'useC8Config',
        ...Object.keys(DEFAULT_OPTS),
    ],
);

const isDefaultSetting = value => value == null;

const isUnknownOptionName = name => !KNOWN_OPTION_SET.has(name);

const quote = name => `'${name}'`;

export default async function resolveOptions(inlOpts = { })
{
    validateInlineOptions(inlOpts);

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
    for (const [key, defaultValue] of Object.entries(DEFAULT_OPTS))
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

function validateInlineOptions(inlOpts)
{
    const unknownOptionNames = Object.keys(inlOpts).filter(isUnknownOptionName);
    const { length } = unknownOptionNames;
    if (length)
    {
        unknownOptionNames.sort();
        const listText = new Intl.ListFormat('en').format(unknownOptionNames.map(quote));
        const message =
        length > 1 ?
        `The following options are not known to c8js: ${listText}` :
        `The following option is not known to c8js: ${listText}`;
        const error = Error(message);
        error.code = 'C8JS_UNKNOWN_OPTIONS';
        error.unknownOptionNames = unknownOptionNames;
        throw error;
    }
}

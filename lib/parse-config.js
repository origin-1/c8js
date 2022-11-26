import { requireAsC8 }  from './utils.js';
import { readFileSync } from 'fs';

const Yargs             = requireAsC8('yargs/yargs');
const { applyExtends }  = requireAsC8('yargs/helpers');

const C8_OPTION_SET =
new Set
(
    [
        '100',
        'all',
        'allowExternal',
        'branches',
        'checkCoverage',
        'clean',
        'exclude',
        'excludeAfterRemap',
        'excludeNodeModules',
        'extension',
        'functions',
        'include',
        'lines',
        'omitRelative',
        'perFile',
        'reporter',
        'resolve',
        'reportsDirectory',
        'skipFull',
        'src',
        'statements',
        'tempDirectory',
        'watermarks',
        'wrapperLength',
    ],
);

const FIND_UP_NAMES = ['.c8rc', '.c8rc.json', '.nycrc', '.nycrc.json'];

function fail(message, error)
{
    throw error;
}

const findUp = requireAsC8('find-up');

export default async function parseConfig(cwd, c8Config)
{
    const configPath = c8Config != null ? c8Config : await findUp(FIND_UP_NAMES, { cwd });
    const options =
    Yargs([])
    .option('exclude', { alias: 'x' })
    .option('exclude-after-remap', { alias: 'a' })
    .option('extension', { alias: 'e' })
    .option('include', { alias: 'n' })
    .option('reporter', { alias: 'r' })
    .option('reports-dir', { alias: ['o', 'report-dir'] })
    .fail(fail)
    .version(false)
    .option
    (
        '',
        {
            config:     true,
            configParser(configPath)
            {
                let config;
                const configData = readFileSync(configPath);
                try
                {
                    config = JSON.parse(configData);
                }
                catch ({ message })
                {
                    throw Error(`Unable to parse file '${configPath}': ${message}`);
                }
                return applyExtends(config, cwd, true);
            },
            default:    configPath,
        },
    )
    .pkgConf('c8', cwd)
    .argv;
    if ('o' in options)
        options.reportsDirectory = options.o;
    for (const key in options)
    {
        if (!C8_OPTION_SET.has(key))
            delete options[key];
    }
    return options;
}

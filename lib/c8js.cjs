'use strict';

function createWrapper(exportName, fnLength, fnName = exportName)
{
    const wrapper =
    async function (...args)
    {
        const fn = await getExport(exportName);
        const returnValue = await fn(...args);
        return returnValue;
    };
    Object.defineProperty(wrapper, 'length', { value: fnLength });
    Object.defineProperty(wrapper, 'name', { value: fnName });
    return wrapper;
}

async function getCommand(commandName)
{
    const commands = await getExport('commands');
    const command = commands[commandName];
    return command;
}

async function getExport(exportName)
{
    const c8js = await import('./c8js.js');
    const value = c8js[exportName];
    return value;
}

const commands =
Object.seal
(
    {
        get node()
        {
            return getCommand('node');
        },
        get npm()
        {
            return getCommand('npm');
        },
        get npx()
        {
            return getCommand('npx');
        },
    },
);

const { version } = require('c8js/package.json');

exports = module.exports    = createWrapper('default', 3, 'c8js');
exports.checkCoverage       = createWrapper('checkCoverage', 1);
exports.commands            = commands;
exports.exec                = createWrapper('exec', 3);
exports.report              = createWrapper('report', 1);
exports.version             = version;

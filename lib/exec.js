import fgExecAsync                                          from './foreground-exec-async.js';
import { c8js_version, createDirectory, deleteDirectory }   from './utils.js';
import { createReadStream }                                 from 'fs';
import { extname, resolve }                                 from 'path';
import { createInterface }                                  from 'readline';

export default async function doExec
(
    command,
    args,
    {
        clean,
        cwd,
        encoding,
        env: rawEnv,
        failFast,
        gid,
        killSignal,
        maxBuffer,
        silent,
        tempDirectory,
        timeout,
        uid,
    },
)
{
    if (clean)
        await deleteDirectory(tempDirectory);
    await createDirectory(tempDirectory);
    const awaitedCommand = await command;
    const commandPath = resolve(cwd, awaitedCommand);
    const env = { ...process.env, c8js_version, ...rawEnv, NODE_V8_COVERAGE: tempDirectory };
    const stdio = silent ? 'pipe' : 'inherit';
    const fgExecAsyncOpts =
    { cwd, encoding, env, failFast, gid, killSignal, maxBuffer, stdio, timeout, uid };
    let execPath;
    let fgExecAsyncArgs;
    if (await isJavaScriptModule(commandPath))
        [execPath, fgExecAsyncArgs] = [process.execPath, [commandPath, ...args]];
    else
        [execPath, fgExecAsyncArgs] = [commandPath, args];
    const result = await fgExecAsync(execPath, fgExecAsyncArgs, fgExecAsyncOpts);
    return result;
}

async function isJavaScriptModule(path)
{
    const extension = extname(path);
    if (extension === '.cjs' || extension === '.js' || extension === '.mjs')
        return true;
    const firstLine = await readFirstLine(path);
    if (firstLine && /^#![\t ]*\/usr\/bin\/env[\t ]+node(?=$|[\0\t #])/.test(firstLine))
        return true;
    return false;
}

function noop()
{ }

async function readFirstLine(path)
{
    const fileStream = createReadStream(path);
    const reader = createInterface(fileStream);
    const executor =
    resolve =>
    {
        let resolveOnce =
        value =>
        {
            resolveOnce = noop;
            resolve(value);
        };
        reader.on('line', line => resolveOnce(line));
        fileStream.on('end', () => resolveOnce(''));
        fileStream.on('error', () => resolveOnce()); // Required for Node.js < 16.
        reader.on('error', () => resolveOnce());
    };
    const line = await new Promise(executor);
    fileStream.destroy();
    return line;
}

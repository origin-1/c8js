export default async function resolveCommand(command, which, process = globalThis.process)
{
    let path = await which(command);
    if (process.platform === 'win32')
        path = path.replace(/[^\\]+\.cmd$/i, `node_modules\\npm\\bin\\${command}-cli.js`);
    return path;
}

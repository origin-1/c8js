import { spawn }    from 'child_process';
import signalExit   from 'signal-exit';

const MAX_BUFFER = 1024 * 1024;

export const SIGNALS = signalExit.signals();

function execFileWithStdIO
(
    command,
    args,
    {
        cwd,
        encoding,
        env,
        gid,
        killSignal = 'SIGTERM',
        maxBuffer = MAX_BUFFER,
        stdio,
        timeout,
        uid,
    },
    callback,
)
{
    function close()
    {
        child.removeListener('close', handleClose);
        child.removeListener('error', handleError);
        if (timeoutId)
        {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        const stdio =
        {
            get stderr()
            {
                const stderr = mergeChunks(child.stderr, stderrChunks);
                stderrChunks = null;
                Object.defineProperty(stdio, 'stderr', { value: stderr });
                return stderr;
            },
            get stdout()
            {
                const stdout = mergeChunks(child.stdout, stdoutChunks);
                stdoutChunks = null;
                Object.defineProperty(stdio, 'stdout', { value: stdout });
                return stdout;
            },
        };
        return stdio;
    }

    function formatCmd()
    {
        let cmd = command;
        if (args.length)
            cmd += ` ${args.join(' ')}`;
        return cmd;
    }

    function handleClose(code, signal)
    {
        const stdio = close();
        if (code === 0 && signal === null)
            callback(null, stdio);
        else
        {
            const cmd = formatCmd();
            if (!error)
            {
                error = new Error(`Command failed: ${cmd}\n${stdio.stderr}`);
                error.code = code;
                error.killed = child.killed;
                error.signal = signal;
            }
            error.cmd = cmd;
            callback(error, stdio);
        }
    }

    function handleError(error)
    {
        child.stdout?.destroy();
        child.stderr?.destroy();
        const stdio = close();
        error.cmd = formatCmd();
        callback(error, stdio);
    }

    const kill = () => child.kill(killSignal);

    function mergeChunks(stream, chunks)
    {
        let formatted;
        if (encoding || stream?.readableEncoding)
            formatted = chunks.join('');
        else
            formatted = Buffer.concat(chunks);
        return formatted;
    }

    function streamToChunks(stream, name)
    {
        const chunks = [];
        chunks.byteLength = 0;
        if (stream)
        {
            if (encoding)
                stream.setEncoding(encoding);
            const listener =
            maxBuffer === Infinity ?
            chunk =>
            {
                chunks.push(chunk);
            } :
            chunk =>
            {
                const encoding = stream.readableEncoding;
                const length = encoding ? Buffer.byteLength(chunk, encoding) : chunk.length;
                const available = maxBuffer - chunks.byteLength;
                if (length > available)
                {
                    chunks.push(chunk.slice(0, available));
                    error = new RangeError(`${name}, maxBuffer length exceeded`);
                    error.code = 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER';
                    kill();
                }
                else
                    chunks.push(chunk);
                chunks.byteLength += length;
            };
            stream.on('data', listener);
        }
        return chunks;
    }

    const child = spawn(command, args, { cwd, env, gid, stdio, uid });
    if (encoding === 'buffer' || !Buffer.isEncoding(encoding))
        encoding = null;
    let error;
    let stdoutChunks = streamToChunks(child.stdout, 'stdout');
    let stderrChunks = streamToChunks(child.stderr, 'stderr');
    let timeoutId;

    if (timeout > 0)
    {
        timeoutId =
        setTimeout
        (
            () =>
            {
                kill();
                timeoutId = undefined;
            },
            timeout,
        );
    }

    child.addListener('close', handleClose);
    child.addListener('error', handleError);
    return child;
}

export default async function fgExecAsync
(command, args, options = { }, process = globalThis.process)
{
    function executor(resolve, reject)
    {
        const callback =
        (error, stdio) =>
        {
            callbackError = error;
            unproxySignals();
            process.removeListener('exit', childHangup);
            if (error && options.failFast)
                reject(error);
            else
            {
                const { stderr, stdout } = stdio;
                const result =
                {
                    status: child.exitCode,
                    signal: child.signalCode,
                    output: [null, stdout, stderr],
                    pid: child.pid,
                    stdout,
                    stderr,
                    error,
                };
                resolve(result);
            }
        };
        const child = execFileWithStdIO(command, args, options, callback);
        const unproxySignals = proxySignals(process, child);
        const hangupSignal = process.platform !== 'win32' ? 'SIGHUP' : 'SIGTERM';
        const childHangup =
        () =>
        {
            child.kill(hangupSignal);
        };
        process.addListener('exit', childHangup);
    }

    function onfinally()
    {
        if (callbackError)
            Error.captureStackTrace(callbackError, fgExecAsync);
    }

    let callbackError;
    const result = await new Promise(executor).finally(onfinally);
    return result;
}

function proxySignals(parent, child)
{
    const listeners = new Map();
    for (const signal of SIGNALS)
    {
        const listener = () => child.kill(signal);
        listeners.set(signal, listener);
        parent.addListener(signal, listener);
    }
    const unproxySignals =
    () =>
    {
        for (const [sig, listener] of listeners)
            parent.removeListener(sig, listener);
    };
    return unproxySignals;
}

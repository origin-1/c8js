import { spawn } from 'child_process';

const MAX_BUFFER = 1024 * 1024;

function execFileWithStdIO
(
    command,
    args,
    {
        cwd,
        encoding,
        env,
        gid,
        maxBuffer,
        stdio,
        timeout,
        uid,
    },
    killChild,
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
                error = Error(`Command failed: ${cmd}\n${stdio.stderr}`);
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
                    error = RangeError(`${name}, maxBuffer length exceeded`);
                    error.code = 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER';
                    killChild();
                }
                else
                    chunks.push(chunk);
                chunks.byteLength += length;
            };
            stream.on('data', listener);
        }
        return chunks;
    }

    if (maxBuffer == null)
        maxBuffer = MAX_BUFFER;
    validateTimeout(timeout);
    validateMaxBuffer(maxBuffer);

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
                killChild();
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
            process.removeListener('exit', killChild);
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
                    pid:    child.pid,
                    stdout,
                    stderr,
                    error,
                };
                resolve(result);
            }
        };
        let { killSignal } = options;
        if (killSignal == null)
            killSignal = 'SIGTERM';
        validateKillSignal(killSignal);
        const killChild =
        () =>
        {
            child.kill(killSignal);
        };
        const child = execFileWithStdIO(command, args, options, killChild, callback);
        process.addListener('exit', killChild);
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

function validateKillSignal(killSignal)
{
    // Signal validation is flawed in current versions of Node.js, so we will only validate the
    // argument type. See https://github.com/nodejs/node/issues/44749.
    const type = typeof killSignal;
    if (type !== 'number' && type !== 'string')
    {
        const message = 'The value of option "killSignal" must be one of type string or number.';
        const error = TypeError(message);
        error.code = 'ERR_INVALID_ARG_TYPE';
        throw error;
    }
}

function validateMaxBuffer(maxBuffer)
{
    if (!(typeof maxBuffer === 'number' && maxBuffer >= 0))
    {
        const message =
        'The value of option "maxBuffer" is out of range. It must be a non-negative number.';
        const error = RangeError(message);
        error.code = 'ERR_OUT_OF_RANGE';
        throw error;
    }
}

function validateTimeout(timeout)
{
    if (timeout != null && !(Number.isInteger(timeout) && timeout >= 0))
    {
        const message =
        'The value of option "timeout" is out of range. It must be an unsigned integer.';
        const error = RangeError(message);
        error.code = 'ERR_OUT_OF_RANGE';
        throw error;
    }
}

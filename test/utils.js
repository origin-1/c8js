import { AssertionError }       from 'assert';
import { mkdtemp, readFile }    from 'fs/promises';
import { tmpdir }               from 'os';
import { join }                 from 'path';
import { fileURLToPath }        from 'url';

export function assertStackTraceConnected(stack)
{
    function getCallerURL()
    {
        let url;
        const { prepareStackTrace } = Error;
        Error.prepareStackTrace =
        (_, [callSite]) =>
        {
            url = callSite.getFileName();
        };
        {
            const targetObject = { };
            const originalStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 1;
            Error.captureStackTrace(targetObject, assertStackTraceConnected);
            Error.stackTraceLimit = originalStackTraceLimit;
            void targetObject.stack;
        }
        Error.prepareStackTrace = prepareStackTrace;
        return url;
    }

    const callerURL = getCallerURL();
    const stackTraceConnected =
    /\n    at (?:async )?doExec \(/.test(stack) && stack.includes(`(${callerURL}:`);
    if (!stackTraceConnected)
    {
        const message =
        'The stack trace does not show a connection between `doExec` and the current module';
        const error =
        new AssertionError({ actual: stack, message, stackStartFn: assertStackTraceConnected });
        throw error;
    }
}

export const createTempDirectory = () => mkdtemp(join(tmpdir(), '/'));

export const joinPath = (...paths) => join(projectRoot, ...paths);

export async function loadJSON(fileName)
{
    const text = await readFile(fileName);
    const value = JSON.parse(text);
    return value;
}

export const projectRoot = fileURLToPath(new URL('..', import.meta.url));

export default class LowCoverageError extends Error
{
    constructor(fails)
    {
        super();
        this.fails = fails;
    }

    get code()
    {
        return 'LOW_COVERAGE';
    }

    get message()
    {
        const failStrs = this.fails.map(formatFail);
        const message = `Insufficient coverage\n${failStrs.join('\n')}`;
        Object.defineProperty(this, 'message', { configurable: true, value: message });
        return message;
    }
}

function formatFail({ fileName, key, threshold, coverage })
{
    let message;
    if (fileName)
        message = `does not meet threshold (${threshold}%) for ${fileName}`;
    else
        message = `does not meet global threshold (${threshold}%)`;
    const str = `Coverage for ${key} (${coverage}%) ${message}`;
    return str;
}

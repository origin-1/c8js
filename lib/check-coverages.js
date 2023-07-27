import LowCoverageError     from './low-coverage-error.js';
import { standardizePath }  from './utils.js';

export default function checkCoverages(opts, coverageMap)
{
    const thresholds =
    {
        __proto__:  null,
        lines:      opts.lines,
        functions:  opts.functions,
        branches:   opts.branches,
        statements: opts.statements,
    };
    const fails = [];
    if (opts.perFile)
    {
        const files = coverageMap.files();
        const { cwd } = opts;
        for (const fileName of files)
        {
            const summary = coverageMap.fileCoverageFor(fileName).toSummary();
            checkCoverage(fails, thresholds, summary, fileName, cwd);
        }
    }
    else
    {
        const summary = coverageMap.getCoverageSummary();
        checkCoverage(fails, thresholds, summary);
    }
    if (fails.length)
        throw new LowCoverageError(fails);
}

function checkCoverage(fails, thresholds, summary, fileName, cwd)
{
    let standardFileName = null;
    for (const key in thresholds)
    {
        const coverage = summary[key].pct;
        const threshold = thresholds[key];
        if (coverage < threshold)
        {
            if (fileName && !standardFileName)
                standardFileName = standardizePath(fileName, cwd);
            const fail = { fileName: standardFileName, key, threshold, coverage };
            fails.push(fail);
        }
    }
}

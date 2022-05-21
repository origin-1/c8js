import LowCoverageError     from './low-coverage-error.js';
import { standardizePath }  from './utils.js';

export default function checkCoverages(opts, coverageMap)
{
    const thresholds =
    {
        lines:      opts.lines,
        functions:  opts.functions,
        branches:   opts.branches,
        statements: opts.statements,
    };
    if (opts.perFile)
    {
        const files = coverageMap.files();
        const { cwd } = opts;
        for (const file of files)
        {
            const summary = coverageMap.fileCoverageFor(file).toSummary();
            checkCoverage(summary, thresholds, file, cwd);
        }
    }
    else
    {
        const summary = coverageMap.getCoverageSummary();
        checkCoverage(summary, thresholds);
    }
}

function checkCoverage(summary, thresholds, fileName, cwd)
{
    const fails = [];
    Object.keys(thresholds).forEach
    (
        key =>
        {
            const coverage = summary[key].pct;
            const threshold = thresholds[key];
            if (coverage < threshold)
            {
                let fail;
                if (fileName)
                {
                    const standardFileName = standardizePath(fileName, cwd);
                    fail = { fileName: standardFileName, key, threshold, coverage };
                }
                else
                    fail = { fileName: null, key, threshold, coverage };
                fails.push(fail);
            }
        },
    );
    if (fails.length)
        throw new LowCoverageError(fails);
}

import { requireAsC8 }  from './utils.js';
import c8               from 'c8';

const { createContext } = requireAsC8('istanbul-lib-report');
const { create }        = requireAsC8('istanbul-reports');

const c8Report = c8.Report;

export default function createReport(opts)
{
    const report = c8Report(opts);
    report.cwd = report.exclude.cwd = opts.cwd;
    report.run = run;
    return report;
}

async function run()
{
    const coverageMap = await this.getCoverageMapFromAllCoverageFiles();
    const context =
    createContext({ coverageMap, dir: this.reportsDirectory, watermarks: this.watermarks });
    const baseOptions =
    { maxCols: 100, projectRoot: this.cwd, skipEmpty: false, skipFull: this.skipFull };
    const { reporterOptions } = this;
    for (const reporter of this.reporter)
    {
        const options = { ...baseOptions, ...reporterOptions?.[reporter] };
        create(reporter, options).execute(context);
    }
}

import { requireAsC8 }          from './utils.js';
import { Report as c8Report }   from 'c8';

const { createContext } = requireAsC8('istanbul-lib-report');
const { create }        = requireAsC8('istanbul-reports');

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
    const options =
    { maxCols: 100, projectRoot: this.cwd, skipEmpty: false, skipFull: this.skipFull };
    for (const _reporter of this.reporter)
        create(_reporter, options).execute(context);
}

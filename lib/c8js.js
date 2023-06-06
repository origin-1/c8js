import checkCoverages               from './check-coverages.js';
import createReport                 from './create-report.js';
import doExec                       from './exec.js';
import resolveOptions               from './resolve-options.js';
import { c8js_version as version }  from './utils.js';
import which                        from 'which';

export default async function c8js(command, args, inlOpts)
{
    if (arguments.length === 2 && !Array.isArray(args))
        [args, inlOpts] = [undefined, args];
    if (args === undefined)
        args = [];
    const resOpts = await resolveOptions(inlOpts);
    const result = await doExec(command, args, resOpts, true);
    const coverageMap = await runReportAndCheckCoverages(resOpts);
    if (result instanceof Error)
        throw result;
    result.coverageMap = coverageMap;
    return result;
}

export async function checkCoverage(inlOpts)
{
    const resOpts = await resolveOptions(inlOpts);
    const report = createReport(resOpts);
    const coverageMap = await report.getCoverageMapFromAllCoverageFiles();
    checkCoverages(resOpts, coverageMap);
}

export const commands =
Object.seal
(
    {
        get node()
        {
            return Promise.resolve(process.execPath);
        },
        get npm()
        {
            return which('npm');
        },
        get npx()
        {
            return which('npx');
        },
    },
);

export async function exec(command, args, inlOpts)
{
    if (arguments.length === 2 && !Array.isArray(args))
        [args, inlOpts] = [undefined, args];
    if (args === undefined)
        args = [];
    const resOpts = await resolveOptions(inlOpts);
    const result = await doExec(command, args, resOpts, false);
    return result;
}

export async function report(inlOpts)
{
    const resOpts = await resolveOptions(inlOpts);
    const coverageMap = await runReportAndCheckCoverages(resOpts);
    return coverageMap;
}

async function runReportAndCheckCoverages(resOpts)
{
    const report = createReport(resOpts);
    await report.run();
    const coverageMap = await report.getCoverageMapFromAllCoverageFiles();
    if (resOpts.checkCoverage)
        checkCoverages(resOpts, coverageMap);
    return coverageMap;
}

export { version };

for (const [name, value] of Object.entries({ checkCoverage, commands, exec, report, version }))
    Object.defineProperty(c8js, name, { value });

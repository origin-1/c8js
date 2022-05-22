import type { Report }                              from 'c8';
import type { ProcessEnvOptions, SpawnSyncReturns } from 'child_process';
import type { CoverageMap }                         from 'istanbul-lib-coverage';
// eslint-disable-next-line node/prefer-global/url
import type { URL }                                 from 'url';
import                                              'node';

interface CommonOptions
{
    /**
     * Path to c8 JSON configuration file.
     * If not provided, c8js searches for files named `.c8rc`, `.c8rc.json`, `.nycrc`, or
     * `.nycrc.json`, starting from `cwd` and walking up the filesystem tree.
     */
    c8Config?:          string | undefined;

    /**
     * Current working directory of the subprocess, project root of reports and base directory for
     * all relative paths. Must be an absolute path.
     * @default process.cwd
     */
    cwd?:               string | URL | undefined;

    /**
     * Directory where coverage reports will be output to.
     * The specified directory is ignored if none of the selected reports writes to disk.
     * This option is used to determine the location of `tempDirectory`, if not specified.
     * @default 'coverage'
     */
    reportsDirectory?:  string | undefined;

    /**
     * Directory where temporary V8 coverage files are written to and read from.
     * This directory will be created if it does not exist.
     * Defaults to a subdirectory named `'tmp'` in the directory specified by `reportsDirectory`.
     */
    tempDirectory?:     string | undefined;
}

type ReportOptions = ConstructorParameters<typeof Report>[0];

type Undefinedable<Type> = { [Key in keyof Type]: Type[Key] | undefined };

type Watermark = [number, number];

interface Watermarks
{
    branches?:      Watermark | undefined;
    functions?:     Watermark | undefined;
    lines?:         Watermark | undefined;
    statements?:    Watermark | undefined;
}

declare const c8js:
{
    (command: string | Promise<string>, options?: c8js.Options):
    Promise<c8js.Result>;

    (command: string | Promise<string>, args?: readonly string[], options?: c8js.Options):
    Promise<c8js.Result>;

    readonly checkCoverage: typeof checkCoverage;
    readonly commands:      typeof commands;
    readonly exec:          typeof exec;
    readonly report:        typeof report;
    readonly version:       typeof version;
};

declare namespace c8js
{
    interface Options extends exec.Options, report.Options
    { }

    interface Result extends SpawnSyncReturns<string | Buffer>
    {
        coverageMap: CoverageMap;
    }
}

declare function checkCoverage
(options?: checkCoverage.Options & Partial<c8js.Options>):
Promise<void>;

declare namespace checkCoverage
{
    interface Options
    extends CommonOptions, Undefinedable<Omit<ReportOptions, 'reporter' | 'src' | 'watermarks'>>
    {
        /**
         * Fails if coverage falls below 100%.
         * @default false
         */
        100?:                   boolean | undefined;

        /**
         * Percentage of branches that must be covered for the check to pass.
         * This setting is ignored if option `100` is used.
         * @default 0
         */
        branches?:              number | undefined;

        /**
         * Whether or not to exclude all `'node_module'` folders.
         * @default true
         */
        excludeNodeModules?:    boolean | undefined;

        /**
         * Percentage of functions that must be covered for the check to pass.
         * This setting is ignored if option `100` is used.
         * @default 0
         */
        functions?:             number | undefined;

        /**
         * Percentage of lines that must be covered for the check to pass.
         * This setting is ignored if option `100` is used.
         * @default 90
         */
        lines?:                 number | undefined;

        /**
         * Checks thresholds on a per-file basis.
         * @default false
         */
        perFile?:               boolean | undefined;

        /**
         * Overrides `cwd` as the location where source files are looked for when the option `all`
         * is specified.
         * This allows for workspaces spanning multiple projects.
         */
        src?:                   string | string[] | undefined;

        /**
         * Percentage of statements that must be covered for the check to pass.
         * This setting is ignored if option `100` is used.
         * @default 0
         */
        statements?:            number | undefined;
    }
}

declare const commands:
{
    get node(): Promise<string>;
    get npm():  Promise<string>;
    get npx():  Promise<string>;
};

declare function exec
(
    command: string | Promise<string>,
    options?: exec.Options & Partial<c8js.Options>,
):
Promise<SpawnSyncReturns<string | Buffer>>;

declare function exec
(
    command: string | Promise<string>,
    args?: readonly string[],
    options?: exec.Options & Partial<c8js.Options>,
):
Promise<SpawnSyncReturns<string | Buffer>>;

declare namespace exec
{
    interface Options extends CommonOptions, ProcessEnvOptions
    {
        /**
         * If `false`, temporary V8 coverage files will not be deleted before subprocess execution.
         * @default false
         */
        clean?:         boolean | undefined;

        /**
         * The encoding used for all stdio inputs and outputs.
         * @default 'utf8'
         */
        encoding?:      BufferEncoding | 'buffer' | null | undefined;

        /**
         * Environment key-value pairs.
         * @default process.env
         */
        env?:           NodeJS.ProcessEnv | undefined;

        /**
         * By default, an error during subprocess execution will be reported as an exception,
         * similar to the `Error` object passed as the first argument to a callback of `execFile`.
         * If the option `failFast` is set to `false`, an error during subprocess execution will not
         * trigger an exception; instead, the result will contain a property `error` holding the
         * `Error` object.
         * @default true
         */
        failFast?:      boolean | undefined;

        /**
         * Sets the group identity of the process.
         */
        gid?:           number | undefined;

        /**
         * The signal value used to kill the subprocess in case of timeout or buffer overflow.
         * @default 'SIGTERM'
         */
        killSignal?:    NodeJS.Signals | number | undefined;

        /**
         * Largest amount of data in bytes allowed on stdout or stderr. If exceeded, the subprocess
         * is terminated and any output is truncated.
         * @default 1024 * 1024
         */
        maxBuffer?:     number | undefined;

        /**
         * If `true`, stdin, stdout, and stderr of the subprocess will be piped to the current
         * process, otherwise they will be inherited from the current process.
         * @default false
         */
        silent?:        boolean | undefined;

        /**
         * The maximum amount of time the process is allowed to run in milliseconds.
         * A non-positive value means no time limit.
         * @default undefined
         */
        timeout?:       number | undefined;

        /**
         * Sets the user identity of the process.
         */
        uid?:           number | undefined;
    }
}

declare function report(options?: report.Options & Partial<c8js.Options>): Promise<CoverageMap>;

declare namespace report
{
    interface Options extends checkCoverage.Options
    {
        /**
         * Whether to check that code coverage is within the specified thresholds.
         * This setting is ignored if option `100` is used.
         * @default false
         */
        checkCoverage?: boolean | undefined;

        /**
         * Coverage reporter(s) to use.
         * @default 'text'
         */
        reporter?:      string | string[] | undefined;

        /**
         * If `true`, files with 100% statement, branch, and function coverage will not be shown by
         * the text reporter.
         * @default false
         */
        skipFull?:      boolean | undefined;

        /**
         * Thresholds for high and low code coverage watermarks, exposed by some reporters.
         */
        watermarks?:    Watermarks | undefined;
    }
}

declare const version: string;

export { c8js as default, checkCoverage, commands, exec, report, version };
export type { CoverageMap, Watermark, Watermarks };

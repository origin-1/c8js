import type { Report }                              from 'c8';
import type { ProcessEnvOptions, SpawnSyncReturns } from 'child_process';
import type { CoverageMap }                         from 'istanbul-lib-coverage';
// eslint-disable-next-line n/prefer-global/url
import type { URL }                                 from 'url';
import                                              'node';

interface CommonOptions
{
    /**
     * Path to c8 JSON configuration file.
     * If not provided, c8js searches for files named `'.c8rc'`, `'.c8rc.json'`, `'.nycrc'`, or
     * `'.nycrc.json'`, starting from `cwd` and walking up the filesystem tree.
     * This setting is ignored if option {@link useC8Config `useC8Config`} is set to `false`.
     */
    c8Config?:          string | undefined;

    /**
     * Current working directory of the subprocess, project root of reports and base directory for
     * all relative paths.
     * Must be an absolute path.
     *
     * @defaultValue `process.cwd`
     */
    cwd?:               string | URL | undefined;

    /**
     * Directory where coverage reports will be output to.
     * The specified directory is ignored if none of the selected reports writes to disk.
     * This option is used to determine the location of {@link tempDirectory `tempDirectory`}, if
     * not specified.
     *
     * @defaultValue `'coverage'`
     */
    reportsDirectory?:  string | undefined;

    /**
     * Directory where temporary V8 coverage files are written to and read from.
     * This directory will be created if it does not exist.
     * Defaults to a subdirectory named `'tmp'` in the directory specified by
     * {@link reportsDirectory `reportsDirectory`}.
     */
    tempDirectory?:     string | undefined;

    /**
     * If `false`, c8js will not load c8 options from a `c8` section in `'package.json'`, or from a
     * JSON configuration file on disk.
     *
     * @defaultValue `true`
     */
    useC8Config?:       boolean | undefined;
}

type InheritableC8Options =
Undefinedable<Omit<ConstructorParameters<typeof Report>[0], 'reporter' | 'src' | 'watermarks'>>;

type Undefinedable<Type> = { [Key in keyof Type]: Type[Key] | undefined; };

/** Thresholds for low and high code coverage watermarks. */
type Watermark = [low: number, high: number];

/**
 * Thresholds for low and high code coverage watermarks for branches, functions, lines and
 * statements.
 */
interface Watermarks
{
    /** Thresholds for branches. */
    branches?:      Watermark | undefined;

    /** Thresholds for functions. */
    functions?:     Watermark | undefined;

    /** Thresholds for lines. */
    lines?:         Watermark | undefined;

    /** Thresholds for statements. */
    statements?:    Watermark | undefined;
}

/**
 * Executes a command, generates a coverage report and optionally checks that code coverage is
 * within the specified thresholds.
 *
 * By default, if the command exits with a nonzero code this function will throw an error without
 * generating a coverage report.
 * This behavior can be changed with the option
 * {@link exec.Options.throwExecError `throwExecError`}.
 *
 * This function does not spawn a shell to parse the command line, so don't put any additional
 * spaces or quotes around the command or the arguments.
 *
 * @param command
 * The command to run.
 * This can be a binary executable or a Node.js module.
 * If a promise is specified, the resolved value will be used.
 *
 * @param args
 * A list of arguments passed to the command.
 *
 * @param options
 * Options for the function.
 *
 * @returns
 * A promise that settles after the command has terminated.
 * The promise will resolve with an object similar to the return value of
 * [`child_process.spawnSync`](
 * https://nodejs.org/api/child_process.html#child_processspawnsynccommand-args-options) with an
 * additional property holding the coverage map.
 */
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

/**
 * Checks that code coverage is within the specified thresholds.
 *
 * @param options
 * Options for the function.
 *
 * @returns
 * A promise that resolves if code coverage is within the thresholds, and rejects otherwise, or if
 * an error occurs.
 */
declare function checkCoverage
(options?: checkCoverage.Options & Partial<c8js.Options>):
Promise<void>;

declare namespace checkCoverage
{
    interface Options extends CommonOptions, InheritableC8Options
    {
        /**
         * If `true`, all files specified with the options {@link src `src`},
         * {@link include `include`}, {@link exclude `exclude`} and {@link extension `extension`}
         * will be loaded into the report.
         * If any of those files remain uncovered, they will be factored into the report with a
         * default of 0% coverage.
         *
         * @defaultValue `false`
         */
        all?:                   boolean | undefined;

        /**
         * Fails if coverage falls below 100%.
         *
         * @defaultValue `false`
         */
        100?:                   boolean | undefined;

        /**
         * Percentage of branches that must be covered for the check to pass.
         * This setting is ignored if option {@link "100" `100`} is used.
         *
         * @defaultValue `0`
         */
        branches?:              number | undefined;

        /**
         * Glob patterns matching files that should be excluded from coverage.
         *
         * @defaultValue `await import('@istanbuljs/schema/default-exclude.js')`
         */
        exclude?:               string | string[] | undefined;

        /**
         * Whether to apply exclusion logic after source maps are used to remap compiled to original
         * source files, or before.
         *
         * @defaultValue `false`
         */
        excludeAfterRemap?:     boolean;

        /**
         * Whether or not to exclude all `'node_module'` folders.
         *
         * @defaultValue `true`
         */
        excludeNodeModules?:    boolean | undefined;

        /**
         * Only files matching these extensions will be included in coverage.
         *
         * @defaultValue `['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx']`
         */
        extension?:             string | string[] | undefined;

        /**
         * Percentage of functions that must be covered for the check to pass.
         * This setting is ignored if option {@link "100" `100`} is used.
         *
         * @defaultValue `0`
         */
        functions?:             number | undefined;

        /**
         * Glob patterns matching files that should be included in coverage.
         * An empty array matches all files.
         *
         * @defaultValue `[]`
         */
        include?:               string | string[] | undefined;

        /**
         * Percentage of lines that must be covered for the check to pass.
         * This setting is ignored if option {@link "100" `100`} is used.
         *
         * @defaultValue `90`
         */
        lines?:                 number | undefined;

        /**
         * Checks thresholds on a per-file basis.
         *
         * @defaultValue `false`
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
         * This setting is ignored if option {@link "100" `100`} is used.
         *
         * @defaultValue `0`
         */
        statements?:            number | undefined;
    }
}

/** Common commands for c8js. */
declare const commands:
{
    /** A new promise that resolves to the path of node. */
    readonly node:  Promise<string>;

    /** A new promise that resolves to the path of npm. */
    readonly npm:   Promise<string>;

    /** A new promise that resolves to the path of npx. */
    readonly npx:   Promise<string>;
};

declare function exec
(
    command: string | Promise<string>,
    options?: exec.Options & Partial<c8js.Options>,
):
Promise<exec.Result>;

/**
 * Executes a command, ensuring that temporary code coverage data is created.
 *
 * This function does not spawn a shell to parse the command line, so don't put any additional
 * spaces or quotes around the command or the arguments.
 *
 * @param command
 * The command to run.
 * This can be a binary executable or a Node.js module.
 * If a promise is specified, the resolved value will be used.
 *
 * @param args
 * A list of arguments passed to the command.
 *
 * @param options
 * Options for the function.
 *
 * @returns
 * A promise that settles after the command has terminated.
 * The promise will resolve with an object similar to the return value of
 * [`child_process.spawnSync`](
 * https://nodejs.org/api/child_process.html#child_processspawnsynccommand-args-options).
 */
declare function exec
(
    command: string | Promise<string>,
    args?: readonly string[],
    options?: exec.Options & Partial<c8js.Options>,
):
Promise<exec.Result>;

declare namespace exec
{
    interface Options extends CommonOptions, ProcessEnvOptions
    {
        /**
         * If `false`, temporary V8 coverage files will not be deleted before subprocess execution.
         *
         * @defaultValue `false`
         */
        clean?:             boolean | undefined;

        /**
         * The character encoding used to decode the stdout and stderr output.
         * If `'buffer'`, or an unrecognized character encoding is specified, `Buffer` objects will
         * be returned instead of strings.
         *
         * @defaultValue `'utf8'`
         */
        encoding?:          BufferEncoding | 'buffer' | null | undefined;

        /**
         * Environment key-value pairs.
         *
         * @defaultValue `process.env`
         */
        env?:               NodeJS.ProcessEnv | undefined;

        /**
         * Sets the group identity of the process.
         */
        gid?:               number | undefined;

        /**
         * The signal value used to kill the subprocess in case of timeout, buffer overflow, or when
         * the current process exits.
         *
         * @defaultValue `'SIGTERM'`
         */
        killSignal?:        NodeJS.Signals | number | undefined;

        /**
         * Largest amount of data in bytes allowed on stdout or stderr.
         * If exceeded, the subprocess is terminated and any output is truncated.
         *
         * @defaultValue `1024 * 1024`
         */
        maxBuffer?:         number | undefined;

        /**
         * If `true`, stdin, stdout, and stderr of the subprocess will be piped to the current
         * process, otherwise they will be inherited from the current process.
         *
         * @defaultValue `false`
         */
        silent?:            boolean | undefined;

        /**
         * Controls how an error during subprocess execution is reported to the caller.
         *
         * * `'early'` causes an error during subprocess execution to throw an exception
         * immediately.
         *
         * * `'late'` causes an error during subprocess execution to throw an exception only after
         * any subsequent operations - like generating a report or checking the code coverage - have
         * finished successfully.
         * If no operations are scheduled after subprocess execution, as when {@link exec `exec`} is
         * called, this setting behaves very much like `'early'`.
         *
         * * `'never'` prevents an error during subprocess execution to throw an exception.
         * Instead, if all subsequent operations finish successfully, the property `error` of the
         * returned object will contain an `Error` object.
         *
         * An unrecognized value behaves like `'early'`.
         * In all cases, the `Error` object thrown or returned will be similar to the first argument
         * passed to a callback of [`execFile`](
         * https://nodejs.org/api/child_process.html#child_processexecfilefile-args-options-callback
         * ).
         *
         * @defaultValue `'early'`
         */
        throwExecError?:    'early' | 'late' | 'never' | undefined;

        /**
         * The maximum amount of time the process is allowed to run in milliseconds.
         * A non-positive value means no time limit.
         *
         * @defaultValue `undefined`
         */
        timeout?:           number | undefined;

        /**
         * Sets the user identity of the process.
         */
        uid?:               number | undefined;
    }

    interface Result extends SpawnSyncReturns<string | Buffer>
    { }
}

/**
 * Generates a coverage report and optionally checks that code coverage is
 * within the specified thresholds.
 *
 * @param options
 * Options for the function.
 *
 * @returns
 * A promise that resolves with a coverage map, and rejects if code coverage is not within the
 * thresholds, or if an error occurs.
 */
declare function report(options?: report.Options & Partial<c8js.Options>): Promise<CoverageMap>;

declare namespace report
{
    interface Options extends checkCoverage.Options
    {
        /**
         * Whether to check that code coverage is within the specified thresholds.
         * This setting is ignored if option {@link "100" `100`} is used.
         *
         * @defaultValue `false`
         */
        checkCoverage?: boolean | undefined;

        /**
         * Coverage reporter(s) to use.
         *
         * @defaultValue `'text'`
         */
        reporter?:      string | string[] | undefined;

        /**
         * An object mapping reporter names to additional options passed directly to the respective
         * reporters.
         */
        reporterOptions?: Record<string, Record<string, unknown>>;

        /**
         * If `true`, files with 100% statement, branch, and function coverage will not be shown by
         * the text reporter.
         *
         * @defaultValue `false`
         */
        skipFull?:      boolean | undefined;

        /** Thresholds for low and high code coverage watermarks, exposed by some reporters. */
        watermarks?:    Watermarks | undefined;
    }
}

/** The version string of c8js. */
declare const version: string;

export { c8js as default, checkCoverage, commands, exec, report, version };
export type { Watermark, Watermarks };

[**c8js**](../../../README.md) • **Docs**

***

# Interface: Options

## Extends

- [`Options`](../../exec/interfaces/Options.md).[`Options`](../../report/interfaces/Options.md)

## Properties

### 100?

> `optional` **100**: `boolean`

Fails if coverage falls below 100%.

#### Default Value

`false`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`100`](../../report/interfaces/Options.md#100)

***

### all?

> `optional` **all**: `boolean`

If `true`, all files specified with the options [`src`](../../checkCoverage/interfaces/Options.md#src),
[`include`](../../checkCoverage/interfaces/Options.md#include), [`exclude`](../../checkCoverage/interfaces/Options.md#exclude) and [`extension`](../../checkCoverage/interfaces/Options.md#extension)
will be loaded into the report.
If any of those files remain uncovered, they will be factored into the report with a
default of 0% coverage.

#### Default Value

`false`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`all`](../../report/interfaces/Options.md#all)

***

### allowExternal?

> `optional` **allowExternal**: `boolean`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`allowExternal`](../../report/interfaces/Options.md#allowexternal)

***

### branches?

> `optional` **branches**: `number`

Percentage of branches that must be covered for the check to pass.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`0`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`branches`](../../report/interfaces/Options.md#branches)

***

### c8Config?

> `optional` **c8Config**: `string`

Path to c8 JSON configuration file.
If not provided, c8js searches for files named `'.c8rc'`, `'.c8rc.json'`, `'.nycrc'`, or
`'.nycrc.json'`, starting from `cwd` and walking up the filesystem tree.
This setting is ignored if option [`useC8Config`](../../checkCoverage/interfaces/Options.md#usec8config) is set to `false`.

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`c8Config`](../../report/interfaces/Options.md#c8config)

***

### checkCoverage?

> `optional` **checkCoverage**: `boolean`

Whether to check that code coverage is within the specified thresholds.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`false`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`checkCoverage`](../../report/interfaces/Options.md#checkcoverage)

***

### clean?

> `optional` **clean**: `boolean`

If `false`, temporary V8 coverage files will not be deleted before subprocess execution.

#### Default Value

`false`

#### Inherited from

[`Options`](../../exec/interfaces/Options.md).[`clean`](../../exec/interfaces/Options.md#clean)

***

### cwd?

> `optional` **cwd**: `string` \| `URL`

Current working directory of the subprocess, project root of reports and base directory for
all relative paths.
Must be an absolute path.

#### Default Value

`process.cwd`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`cwd`](../../report/interfaces/Options.md#cwd)

***

### encoding?

> `optional` **encoding**: `null` \| `"buffer"` \| `BufferEncoding`

The character encoding used to decode the stdout and stderr output.
If `'buffer'`, or an unrecognized character encoding is specified, `Buffer` objects will
be returned instead of strings.

#### Default Value

`'utf8'`

#### Inherited from

[`Options`](../../exec/interfaces/Options.md).[`encoding`](../../exec/interfaces/Options.md#encoding)

***

### env?

> `optional` **env**: `ProcessEnv`

Environment key-value pairs.

#### Default Value

`process.env`

#### Inherited from

[`Options`](../../exec/interfaces/Options.md).[`env`](../../exec/interfaces/Options.md#env)

***

### exclude?

> `optional` **exclude**: `string` \| `string`[]

Glob patterns matching files that should be excluded from coverage.

#### Default Value

`await import('@istanbuljs/schema/default-exclude.js')`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`exclude`](../../report/interfaces/Options.md#exclude)

***

### excludeAfterRemap?

> `optional` **excludeAfterRemap**: `boolean`

Whether to apply exclusion logic after source maps are used to remap compiled to original
source files, or before.

#### Default Value

`false`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`excludeAfterRemap`](../../report/interfaces/Options.md#excludeafterremap)

***

### excludeNodeModules?

> `optional` **excludeNodeModules**: `boolean`

Whether or not to exclude all `'node_module'` folders.

#### Default Value

`true`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`excludeNodeModules`](../../report/interfaces/Options.md#excludenodemodules)

***

### extension?

> `optional` **extension**: `string` \| `string`[]

Only files matching these extensions will be included in coverage.

#### Default Value

`['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx']`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`extension`](../../report/interfaces/Options.md#extension)

***

### functions?

> `optional` **functions**: `number`

Percentage of functions that must be covered for the check to pass.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`0`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`functions`](../../report/interfaces/Options.md#functions)

***

### gid?

> `optional` **gid**: `number`

Sets the group identity of the process.

#### Inherited from

[`Options`](../../exec/interfaces/Options.md).[`gid`](../../exec/interfaces/Options.md#gid)

***

### include?

> `optional` **include**: `string` \| `string`[]

Glob patterns matching files that should be included in coverage.
An empty array matches all files.

#### Default Value

`[]`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`include`](../../report/interfaces/Options.md#include)

***

### killSignal?

> `optional` **killSignal**: `number` \| `Signals`

The signal value used to kill the subprocess in case of timeout, buffer overflow, or when
the current process exits.

#### Default Value

`'SIGTERM'`

#### Inherited from

[`Options`](../../exec/interfaces/Options.md).[`killSignal`](../../exec/interfaces/Options.md#killsignal)

***

### lines?

> `optional` **lines**: `number`

Percentage of lines that must be covered for the check to pass.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`90`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`lines`](../../report/interfaces/Options.md#lines)

***

### maxBuffer?

> `optional` **maxBuffer**: `number`

Largest amount of data in bytes allowed on stdout or stderr.
If exceeded, the subprocess is terminated and any output is truncated.

#### Default Value

`1024 * 1024`

#### Inherited from

[`Options`](../../exec/interfaces/Options.md).[`maxBuffer`](../../exec/interfaces/Options.md#maxbuffer)

***

### mergeAsync?

> `optional` **mergeAsync**: `boolean`

Merges all V8 coverage reports asynchronously and incrementally to avoid OOM issues.

#### Default Value

`false`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`mergeAsync`](../../report/interfaces/Options.md#mergeasync)

***

### omitRelative?

> `optional` **omitRelative**: `boolean`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`omitRelative`](../../report/interfaces/Options.md#omitrelative)

***

### perFile?

> `optional` **perFile**: `boolean`

Checks thresholds on a per-file basis.

#### Default Value

`false`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`perFile`](../../report/interfaces/Options.md#perfile)

***

### reporter?

> `optional` **reporter**: `string` \| `string`[]

Coverage reporter(s) to use.

#### Default Value

`'text'`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`reporter`](../../report/interfaces/Options.md#reporter)

***

### reporterOptions?

> `optional` **reporterOptions**: `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

An object mapping reporter names to additional options passed directly to the respective
reporters.

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`reporterOptions`](../../report/interfaces/Options.md#reporteroptions)

***

### reportsDirectory?

> `optional` **reportsDirectory**: `string`

Directory where coverage reports will be output to.
The specified directory is ignored if none of the selected reports writes to disk.
This option is used to determine the location of [`tempDirectory`](../../checkCoverage/interfaces/Options.md#tempdirectory), if
not specified.

#### Default Value

`'coverage'`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`reportsDirectory`](../../report/interfaces/Options.md#reportsdirectory)

***

### resolve?

> `optional` **resolve**: `string`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`resolve`](../../report/interfaces/Options.md#resolve)

***

### silent?

> `optional` **silent**: `boolean`

If `true`, stdin, stdout, and stderr of the subprocess will be piped to the current
process, otherwise they will be inherited from the current process.

#### Default Value

`false`

#### Inherited from

[`Options`](../../exec/interfaces/Options.md).[`silent`](../../exec/interfaces/Options.md#silent)

***

### skipFull?

> `optional` **skipFull**: `boolean`

If `true`, files with 100% statement, branch, and function coverage will not be shown by
the text reporter.

#### Default Value

`false`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`skipFull`](../../report/interfaces/Options.md#skipfull)

***

### src?

> `optional` **src**: `string` \| `string`[]

Overrides `cwd` as the location where source files are looked for when the option `all`
is specified.
This allows for workspaces spanning multiple projects.

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`src`](../../report/interfaces/Options.md#src)

***

### statements?

> `optional` **statements**: `number`

Percentage of statements that must be covered for the check to pass.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`0`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`statements`](../../report/interfaces/Options.md#statements)

***

### tempDirectory?

> `optional` **tempDirectory**: `string`

Directory where temporary V8 coverage files are written to and read from.
This directory will be created if it does not exist.
Defaults to a subdirectory named `'tmp'` in the directory specified by
[`reportsDirectory`](../../checkCoverage/interfaces/Options.md#reportsdirectory).

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`tempDirectory`](../../report/interfaces/Options.md#tempdirectory)

***

### throwExecError?

> `optional` **throwExecError**: `"never"` \| `"early"` \| `"late"`

Controls how an error during subprocess execution is reported to the caller.

* `'early'` causes an error during subprocess execution to throw an exception
immediately.

* `'late'` causes an error during subprocess execution to throw an exception only after
any subsequent operations - like generating a report or checking the code coverage - have
finished successfully.
If no operations are scheduled after subprocess execution, as when [`exec`](../../../functions/exec.md) is
called, this setting behaves very much like `'early'`.

* `'never'` prevents an error during subprocess execution to throw an exception.
Instead, if all subsequent operations finish successfully, the property `error` of the
returned object will contain an `Error` object.

An unrecognized value behaves like `'early'`.
In all cases, the `Error` object thrown or returned will be similar to the first argument
passed to a callback of [`execFile`](
https://nodejs.org/api/child_process.html#child_processexecfilefile-args-options-callback
).

#### Default Value

`'early'`

#### Inherited from

[`Options`](../../exec/interfaces/Options.md).[`throwExecError`](../../exec/interfaces/Options.md#throwexecerror)

***

### timeout?

> `optional` **timeout**: `number`

The maximum amount of time the process is allowed to run in milliseconds.
A non-positive value means no time limit.

#### Default Value

`undefined`

#### Inherited from

[`Options`](../../exec/interfaces/Options.md).[`timeout`](../../exec/interfaces/Options.md#timeout)

***

### uid?

> `optional` **uid**: `number`

Sets the user identity of the process.

#### Inherited from

[`Options`](../../exec/interfaces/Options.md).[`uid`](../../exec/interfaces/Options.md#uid)

***

### useC8Config?

> `optional` **useC8Config**: `boolean`

If `false`, c8js will not load c8 options from a `c8` section in `'package.json'`, or from a
JSON configuration file on disk.

#### Default Value

`true`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`useC8Config`](../../report/interfaces/Options.md#usec8config)

***

### watermarks?

> `optional` **watermarks**: [`Watermarks`](../../../interfaces/Watermarks.md)

Thresholds for low and high code coverage watermarks, exposed by some reporters.

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`watermarks`](../../report/interfaces/Options.md#watermarks)

***

### wrapperLength?

> `optional` **wrapperLength**: `number`

#### Inherited from

[`Options`](../../report/interfaces/Options.md).[`wrapperLength`](../../report/interfaces/Options.md#wrapperlength)

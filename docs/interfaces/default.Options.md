# Interface: Options

[default](../modules/default.md).Options

## Hierarchy

- [`Options`](exec.Options.md)

- [`Options`](report.Options.md)

  ↳ **`Options`**

## Table of contents

### Properties

- [100](default.Options.md#100)
- [all](default.Options.md#all)
- [allowExternal](default.Options.md#allowexternal)
- [branches](default.Options.md#branches)
- [c8Config](default.Options.md#c8config)
- [checkCoverage](default.Options.md#checkcoverage)
- [clean](default.Options.md#clean)
- [cwd](default.Options.md#cwd)
- [encoding](default.Options.md#encoding)
- [env](default.Options.md#env)
- [exclude](default.Options.md#exclude)
- [excludeAfterRemap](default.Options.md#excludeafterremap)
- [excludeNodeModules](default.Options.md#excludenodemodules)
- [extension](default.Options.md#extension)
- [functions](default.Options.md#functions)
- [gid](default.Options.md#gid)
- [include](default.Options.md#include)
- [killSignal](default.Options.md#killsignal)
- [lines](default.Options.md#lines)
- [maxBuffer](default.Options.md#maxbuffer)
- [mergeAsync](default.Options.md#mergeasync)
- [omitRelative](default.Options.md#omitrelative)
- [perFile](default.Options.md#perfile)
- [reporter](default.Options.md#reporter)
- [reporterOptions](default.Options.md#reporteroptions)
- [reportsDirectory](default.Options.md#reportsdirectory)
- [resolve](default.Options.md#resolve)
- [silent](default.Options.md#silent)
- [skipFull](default.Options.md#skipfull)
- [src](default.Options.md#src)
- [statements](default.Options.md#statements)
- [tempDirectory](default.Options.md#tempdirectory)
- [throwExecError](default.Options.md#throwexecerror)
- [timeout](default.Options.md#timeout)
- [uid](default.Options.md#uid)
- [useC8Config](default.Options.md#usec8config)
- [watermarks](default.Options.md#watermarks)
- [wrapperLength](default.Options.md#wrapperlength)

## Properties

### 100

• `Optional` **100**: `boolean`

Fails if coverage falls below 100%.

**`Default Value`**

`false`

#### Inherited from

[Options](report.Options.md).[100](report.Options.md#100)

___

### all

• `Optional` **all**: `boolean`

If `true`, all files specified with the options [`src`](checkCoverage.Options.md#src),
[`include`](checkCoverage.Options.md#include), [`exclude`](checkCoverage.Options.md#exclude) and [`extension`](checkCoverage.Options.md#extension)
will be loaded into the report.
If any of those files remain uncovered, they will be factored into the report with a
default of 0% coverage.

**`Default Value`**

`false`

#### Inherited from

[Options](report.Options.md).[all](report.Options.md#all)

___

### allowExternal

• `Optional` **allowExternal**: `boolean`

#### Inherited from

[Options](report.Options.md).[allowExternal](report.Options.md#allowexternal)

___

### branches

• `Optional` **branches**: `number`

Percentage of branches that must be covered for the check to pass.
This setting is ignored if option [`100`](default.Options.md#100) is used.

**`Default Value`**

`0`

#### Inherited from

[Options](report.Options.md).[branches](report.Options.md#branches)

___

### c8Config

• `Optional` **c8Config**: `string`

Path to c8 JSON configuration file.
If not provided, c8js searches for files named `'.c8rc'`, `'.c8rc.json'`, `'.nycrc'`, or
`'.nycrc.json'`, starting from `cwd` and walking up the filesystem tree.
This setting is ignored if option [`useC8Config`](checkCoverage.Options.md#usec8config) is set to `false`.

#### Inherited from

[Options](report.Options.md).[c8Config](report.Options.md#c8config)

___

### checkCoverage

• `Optional` **checkCoverage**: `boolean`

Whether to check that code coverage is within the specified thresholds.
This setting is ignored if option [`100`](default.Options.md#100) is used.

**`Default Value`**

`false`

#### Inherited from

[Options](report.Options.md).[checkCoverage](report.Options.md#checkcoverage)

___

### clean

• `Optional` **clean**: `boolean`

If `false`, temporary V8 coverage files will not be deleted before subprocess execution.

**`Default Value`**

`false`

#### Inherited from

[Options](exec.Options.md).[clean](exec.Options.md#clean)

___

### cwd

• `Optional` **cwd**: `string` \| `URL`

Current working directory of the subprocess, project root of reports and base directory for
all relative paths.
Must be an absolute path.

**`Default Value`**

`process.cwd`

#### Inherited from

[Options](report.Options.md).[cwd](report.Options.md#cwd)

___

### encoding

• `Optional` **encoding**: ``null`` \| ``"buffer"`` \| `BufferEncoding`

The character encoding used to decode the stdout and stderr output.
If `'buffer'`, or an unrecognized character encoding is specified, `Buffer` objects will
be returned instead of strings.

**`Default Value`**

`'utf8'`

#### Inherited from

[Options](exec.Options.md).[encoding](exec.Options.md#encoding)

___

### env

• `Optional` **env**: `ProcessEnv`

Environment key-value pairs.

**`Default Value`**

`process.env`

#### Inherited from

[Options](exec.Options.md).[env](exec.Options.md#env)

___

### exclude

• `Optional` **exclude**: `string` \| `string`[]

Glob patterns matching files that should be excluded from coverage.

**`Default Value`**

`await import('@istanbuljs/schema/default-exclude.js')`

#### Inherited from

[Options](report.Options.md).[exclude](report.Options.md#exclude)

___

### excludeAfterRemap

• `Optional` **excludeAfterRemap**: `boolean`

Whether to apply exclusion logic after source maps are used to remap compiled to original
source files, or before.

**`Default Value`**

`false`

#### Inherited from

[Options](report.Options.md).[excludeAfterRemap](report.Options.md#excludeafterremap)

___

### excludeNodeModules

• `Optional` **excludeNodeModules**: `boolean`

Whether or not to exclude all `'node_module'` folders.

**`Default Value`**

`true`

#### Inherited from

[Options](report.Options.md).[excludeNodeModules](report.Options.md#excludenodemodules)

___

### extension

• `Optional` **extension**: `string` \| `string`[]

Only files matching these extensions will be included in coverage.

**`Default Value`**

`['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx']`

#### Inherited from

[Options](report.Options.md).[extension](report.Options.md#extension)

___

### functions

• `Optional` **functions**: `number`

Percentage of functions that must be covered for the check to pass.
This setting is ignored if option [`100`](default.Options.md#100) is used.

**`Default Value`**

`0`

#### Inherited from

[Options](report.Options.md).[functions](report.Options.md#functions)

___

### gid

• `Optional` **gid**: `number`

Sets the group identity of the process.

#### Inherited from

[Options](exec.Options.md).[gid](exec.Options.md#gid)

___

### include

• `Optional` **include**: `string` \| `string`[]

Glob patterns matching files that should be included in coverage.
An empty array matches all files.

**`Default Value`**

`[]`

#### Inherited from

[Options](report.Options.md).[include](report.Options.md#include)

___

### killSignal

• `Optional` **killSignal**: `number` \| `Signals`

The signal value used to kill the subprocess in case of timeout, buffer overflow, or when
the current process exits.

**`Default Value`**

`'SIGTERM'`

#### Inherited from

[Options](exec.Options.md).[killSignal](exec.Options.md#killsignal)

___

### lines

• `Optional` **lines**: `number`

Percentage of lines that must be covered for the check to pass.
This setting is ignored if option [`100`](default.Options.md#100) is used.

**`Default Value`**

`90`

#### Inherited from

[Options](report.Options.md).[lines](report.Options.md#lines)

___

### maxBuffer

• `Optional` **maxBuffer**: `number`

Largest amount of data in bytes allowed on stdout or stderr.
If exceeded, the subprocess is terminated and any output is truncated.

**`Default Value`**

`1024 * 1024`

#### Inherited from

[Options](exec.Options.md).[maxBuffer](exec.Options.md#maxbuffer)

___

### mergeAsync

• `Optional` **mergeAsync**: `boolean`

Merges all V8 coverage reports asynchronously and incrementally to avoid OOM issues.

**`Default Value`**

`false`

#### Inherited from

[Options](report.Options.md).[mergeAsync](report.Options.md#mergeasync)

___

### omitRelative

• `Optional` **omitRelative**: `boolean`

#### Inherited from

[Options](report.Options.md).[omitRelative](report.Options.md#omitrelative)

___

### perFile

• `Optional` **perFile**: `boolean`

Checks thresholds on a per-file basis.

**`Default Value`**

`false`

#### Inherited from

[Options](report.Options.md).[perFile](report.Options.md#perfile)

___

### reporter

• `Optional` **reporter**: `string` \| `string`[]

Coverage reporter(s) to use.

**`Default Value`**

`'text'`

#### Inherited from

[Options](report.Options.md).[reporter](report.Options.md#reporter)

___

### reporterOptions

• `Optional` **reporterOptions**: `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

An object mapping reporter names to additional options passed directly to the respective
reporters.

#### Inherited from

[Options](report.Options.md).[reporterOptions](report.Options.md#reporteroptions)

___

### reportsDirectory

• `Optional` **reportsDirectory**: `string`

Directory where coverage reports will be output to.
The specified directory is ignored if none of the selected reports writes to disk.
This option is used to determine the location of [`tempDirectory`](checkCoverage.Options.md#tempdirectory), if
not specified.

**`Default Value`**

`'coverage'`

#### Inherited from

[Options](report.Options.md).[reportsDirectory](report.Options.md#reportsdirectory)

___

### resolve

• `Optional` **resolve**: `string`

#### Inherited from

[Options](report.Options.md).[resolve](report.Options.md#resolve)

___

### silent

• `Optional` **silent**: `boolean`

If `true`, stdin, stdout, and stderr of the subprocess will be piped to the current
process, otherwise they will be inherited from the current process.

**`Default Value`**

`false`

#### Inherited from

[Options](exec.Options.md).[silent](exec.Options.md#silent)

___

### skipFull

• `Optional` **skipFull**: `boolean`

If `true`, files with 100% statement, branch, and function coverage will not be shown by
the text reporter.

**`Default Value`**

`false`

#### Inherited from

[Options](report.Options.md).[skipFull](report.Options.md#skipfull)

___

### src

• `Optional` **src**: `string` \| `string`[]

Overrides `cwd` as the location where source files are looked for when the option `all`
is specified.
This allows for workspaces spanning multiple projects.

#### Inherited from

[Options](report.Options.md).[src](report.Options.md#src)

___

### statements

• `Optional` **statements**: `number`

Percentage of statements that must be covered for the check to pass.
This setting is ignored if option [`100`](default.Options.md#100) is used.

**`Default Value`**

`0`

#### Inherited from

[Options](report.Options.md).[statements](report.Options.md#statements)

___

### tempDirectory

• `Optional` **tempDirectory**: `string`

Directory where temporary V8 coverage files are written to and read from.
This directory will be created if it does not exist.
Defaults to a subdirectory named `'tmp'` in the directory specified by
[`reportsDirectory`](checkCoverage.Options.md#reportsdirectory).

#### Inherited from

[Options](report.Options.md).[tempDirectory](report.Options.md#tempdirectory)

___

### throwExecError

• `Optional` **throwExecError**: ``"never"`` \| ``"early"`` \| ``"late"``

Controls how an error during subprocess execution is reported to the caller.

* `'early'` causes an error during subprocess execution to throw an exception
immediately.

* `'late'` causes an error during subprocess execution to throw an exception only after
any subsequent operations - like generating a report or checking the code coverage - have
finished successfully.
If no operations are scheduled after subprocess execution, as when [`exec`](../modules.md#exec) is
called, this setting behaves very much like `'early'`.

* `'never'` prevents an error during subprocess execution to throw an exception.
Instead, if all subsequent operations finish successfully, the property `error` of the
returned object will contain an `Error` object.

An unrecognized value behaves like `'early'`.
In all cases, the `Error` object thrown or returned will be similar to the first argument
passed to a callback of [`execFile`](
https://nodejs.org/api/child_process.html#child_processexecfilefile-args-options-callback
).

**`Default Value`**

`'early'`

#### Inherited from

[Options](exec.Options.md).[throwExecError](exec.Options.md#throwexecerror)

___

### timeout

• `Optional` **timeout**: `number`

The maximum amount of time the process is allowed to run in milliseconds.
A non-positive value means no time limit.

**`Default Value`**

`undefined`

#### Inherited from

[Options](exec.Options.md).[timeout](exec.Options.md#timeout)

___

### uid

• `Optional` **uid**: `number`

Sets the user identity of the process.

#### Inherited from

[Options](exec.Options.md).[uid](exec.Options.md#uid)

___

### useC8Config

• `Optional` **useC8Config**: `boolean`

If `false`, c8js will not load c8 options from a `c8` section in `'package.json'`, or from a
JSON configuration file on disk.

**`Default Value`**

`true`

#### Inherited from

[Options](report.Options.md).[useC8Config](report.Options.md#usec8config)

___

### watermarks

• `Optional` **watermarks**: [`Watermarks`](Watermarks.md)

Thresholds for low and high code coverage watermarks, exposed by some reporters.

#### Inherited from

[Options](report.Options.md).[watermarks](report.Options.md#watermarks)

___

### wrapperLength

• `Optional` **wrapperLength**: `number`

#### Inherited from

[Options](report.Options.md).[wrapperLength](report.Options.md#wrapperlength)

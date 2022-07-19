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
- [failFast](default.Options.md#failfast)
- [functions](default.Options.md#functions)
- [gid](default.Options.md#gid)
- [include](default.Options.md#include)
- [killSignal](default.Options.md#killsignal)
- [lines](default.Options.md#lines)
- [maxBuffer](default.Options.md#maxbuffer)
- [perFile](default.Options.md#perfile)
- [reporter](default.Options.md#reporter)
- [reportsDirectory](default.Options.md#reportsdirectory)
- [silent](default.Options.md#silent)
- [skipFull](default.Options.md#skipfull)
- [src](default.Options.md#src)
- [statements](default.Options.md#statements)
- [tempDirectory](default.Options.md#tempdirectory)
- [timeout](default.Options.md#timeout)
- [uid](default.Options.md#uid)
- [useC8Config](default.Options.md#usec8config)
- [watermarks](default.Options.md#watermarks)

## Properties

### 100

• `Optional` **100**: `boolean`

Fails if coverage falls below 100%.

**`Default`**

false

#### Inherited from

[Options](report.Options.md).[100](report.Options.md#100)

___

### all

• `Optional` **all**: `boolean`

If `true`, all files specified with the options `src`, `include`, `exclude` and
`extension` will be loaded into the report.
If any of those files remain uncovered, they will be factored into the report with a
default of 0% coverage.

**`Default`**

false

#### Inherited from

[Options](report.Options.md).[all](report.Options.md#all)

___

### branches

• `Optional` **branches**: `number`

Percentage of branches that must be covered for the check to pass.
This setting is ignored if option `100` is used.

**`Default`**

0

#### Inherited from

[Options](report.Options.md).[branches](report.Options.md#branches)

___

### c8Config

• `Optional` **c8Config**: `string`

Path to c8 JSON configuration file.
If not provided, c8js searches for files named `.c8rc`, `.c8rc.json`, `.nycrc`, or
`.nycrc.json`, starting from `cwd` and walking up the filesystem tree.
This setting is ignored if option `useC8Config` is set to `false`.

#### Inherited from

[Options](report.Options.md).[c8Config](report.Options.md#c8config)

___

### checkCoverage

• `Optional` **checkCoverage**: `boolean`

Whether to check that code coverage is within the specified thresholds.
This setting is ignored if option `100` is used.

**`Default`**

false

#### Inherited from

[Options](report.Options.md).[checkCoverage](report.Options.md#checkcoverage)

___

### clean

• `Optional` **clean**: `boolean`

If `false`, temporary V8 coverage files will not be deleted before subprocess execution.

**`Default`**

false

#### Inherited from

[Options](exec.Options.md).[clean](exec.Options.md#clean)

___

### cwd

• `Optional` **cwd**: `string` \| `URL`

Current working directory of the subprocess, project root of reports and base directory for
all relative paths.
Must be an absolute path.

**`Default`**

process.cwd

#### Inherited from

[Options](report.Options.md).[cwd](report.Options.md#cwd)

___

### encoding

• `Optional` **encoding**: ``null`` \| ``"buffer"`` \| `BufferEncoding`

The encoding used for all stdio inputs and outputs.

**`Default`**

'utf8'

#### Inherited from

[Options](exec.Options.md).[encoding](exec.Options.md#encoding)

___

### env

• `Optional` **env**: `ProcessEnv`

Environment key-value pairs.

**`Default`**

process.env

#### Inherited from

[Options](exec.Options.md).[env](exec.Options.md#env)

___

### exclude

• `Optional` **exclude**: `string` \| `string`[]

Glob patterns matching files that should be excluded from coverage.

**`Default`**

await import('@istanbuljs/schema/default-exclude.js')

#### Inherited from

[Options](report.Options.md).[exclude](report.Options.md#exclude)

___

### excludeAfterRemap

• `Optional` **excludeAfterRemap**: `boolean`

Whether to apply exclusion logic after source maps are used to remap compiled to
original source files, or before.

**`Default`**

false

#### Inherited from

[Options](report.Options.md).[excludeAfterRemap](report.Options.md#excludeafterremap)

___

### excludeNodeModules

• `Optional` **excludeNodeModules**: `boolean`

Whether or not to exclude all `'node_module'` folders.

**`Default`**

true

#### Inherited from

[Options](report.Options.md).[excludeNodeModules](report.Options.md#excludenodemodules)

___

### extension

• `Optional` **extension**: `string` \| `string`[]

Only files matching these extensions will be included in coverage.

**`Default`**

['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx']

#### Inherited from

[Options](report.Options.md).[extension](report.Options.md#extension)

___

### failFast

• `Optional` **failFast**: `boolean`

By default, an error during subprocess execution will be reported as an exception,
similar to the `Error` object passed as the first argument to a callback of `execFile`.
If the option `failFast` is set to `false`, an error during subprocess execution will not
trigger an exception; instead, the result will contain a property `error` holding the
`Error` object.

**`Default`**

true

#### Inherited from

[Options](exec.Options.md).[failFast](exec.Options.md#failfast)

___

### functions

• `Optional` **functions**: `number`

Percentage of functions that must be covered for the check to pass.
This setting is ignored if option `100` is used.

**`Default`**

0

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

**`Default`**

[]

#### Inherited from

[Options](report.Options.md).[include](report.Options.md#include)

___

### killSignal

• `Optional` **killSignal**: `number` \| `Signals`

The signal value used to kill the subprocess in case of timeout or buffer overflow.

**`Default`**

'SIGTERM'

#### Inherited from

[Options](exec.Options.md).[killSignal](exec.Options.md#killsignal)

___

### lines

• `Optional` **lines**: `number`

Percentage of lines that must be covered for the check to pass.
This setting is ignored if option `100` is used.

**`Default`**

90

#### Inherited from

[Options](report.Options.md).[lines](report.Options.md#lines)

___

### maxBuffer

• `Optional` **maxBuffer**: `number`

Largest amount of data in bytes allowed on stdout or stderr. If exceeded, the subprocess
is terminated and any output is truncated.

**`Default`**

1024 * 1024

#### Inherited from

[Options](exec.Options.md).[maxBuffer](exec.Options.md#maxbuffer)

___

### perFile

• `Optional` **perFile**: `boolean`

Checks thresholds on a per-file basis.

**`Default`**

false

#### Inherited from

[Options](report.Options.md).[perFile](report.Options.md#perfile)

___

### reporter

• `Optional` **reporter**: `string` \| `string`[]

Coverage reporter(s) to use.

**`Default`**

'text'

#### Inherited from

[Options](report.Options.md).[reporter](report.Options.md#reporter)

___

### reportsDirectory

• `Optional` **reportsDirectory**: `string`

Directory where coverage reports will be output to.
The specified directory is ignored if none of the selected reports writes to disk.
This option is used to determine the location of `tempDirectory`, if not specified.

**`Default`**

'coverage'

#### Inherited from

[Options](report.Options.md).[reportsDirectory](report.Options.md#reportsdirectory)

___

### silent

• `Optional` **silent**: `boolean`

If `true`, stdin, stdout, and stderr of the subprocess will be piped to the current
process, otherwise they will be inherited from the current process.

**`Default`**

false

#### Inherited from

[Options](exec.Options.md).[silent](exec.Options.md#silent)

___

### skipFull

• `Optional` **skipFull**: `boolean`

If `true`, files with 100% statement, branch, and function coverage will not be shown by
the text reporter.

**`Default`**

false

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
This setting is ignored if option `100` is used.

**`Default`**

0

#### Inherited from

[Options](report.Options.md).[statements](report.Options.md#statements)

___

### tempDirectory

• `Optional` **tempDirectory**: `string`

Directory where temporary V8 coverage files are written to and read from.
This directory will be created if it does not exist.
Defaults to a subdirectory named `'tmp'` in the directory specified by `reportsDirectory`.

#### Inherited from

[Options](report.Options.md).[tempDirectory](report.Options.md#tempdirectory)

___

### timeout

• `Optional` **timeout**: `number`

The maximum amount of time the process is allowed to run in milliseconds.
A non-positive value means no time limit.

**`Default`**

undefined

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

If `false`, c8js will not load c8 options from a `c8` section in `package.json`, or from a
JSON configuration file on disk.

**`Default`**

true

#### Inherited from

[Options](report.Options.md).[useC8Config](report.Options.md#usec8config)

___

### watermarks

• `Optional` **watermarks**: [`Watermarks`](Watermarks.md)

Thresholds for low and high code coverage watermarks, exposed by some reporters.

#### Inherited from

[Options](report.Options.md).[watermarks](report.Options.md#watermarks)

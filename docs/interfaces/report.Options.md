# Interface: Options

[report](../modules/report.md).Options

## Hierarchy

- [`Options`](checkCoverage.Options.md)

  ↳ **`Options`**

  ↳↳ [`Options`](default.Options.md)

## Table of contents

### Properties

- [100](report.Options.md#100)
- [all](report.Options.md#all)
- [branches](report.Options.md#branches)
- [c8Config](report.Options.md#c8config)
- [checkCoverage](report.Options.md#checkcoverage)
- [cwd](report.Options.md#cwd)
- [exclude](report.Options.md#exclude)
- [excludeAfterRemap](report.Options.md#excludeafterremap)
- [excludeNodeModules](report.Options.md#excludenodemodules)
- [extension](report.Options.md#extension)
- [functions](report.Options.md#functions)
- [include](report.Options.md#include)
- [lines](report.Options.md#lines)
- [perFile](report.Options.md#perfile)
- [reporter](report.Options.md#reporter)
- [reportsDirectory](report.Options.md#reportsdirectory)
- [skipFull](report.Options.md#skipfull)
- [src](report.Options.md#src)
- [statements](report.Options.md#statements)
- [tempDirectory](report.Options.md#tempdirectory)
- [useC8Config](report.Options.md#usec8config)
- [watermarks](report.Options.md#watermarks)

## Properties

### 100

• `Optional` **100**: `boolean`

Fails if coverage falls below 100%.

**`Default`**

false

#### Inherited from

[Options](checkCoverage.Options.md).[100](checkCoverage.Options.md#100)

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

[Options](checkCoverage.Options.md).[all](checkCoverage.Options.md#all)

___

### branches

• `Optional` **branches**: `number`

Percentage of branches that must be covered for the check to pass.
This setting is ignored if option `100` is used.

**`Default`**

0

#### Inherited from

[Options](checkCoverage.Options.md).[branches](checkCoverage.Options.md#branches)

___

### c8Config

• `Optional` **c8Config**: `string`

Path to c8 JSON configuration file.
If not provided, c8js searches for files named `.c8rc`, `.c8rc.json`, `.nycrc`, or
`.nycrc.json`, starting from `cwd` and walking up the filesystem tree.
This setting is ignored if option `useC8Config` is set to `false`.

#### Inherited from

[Options](checkCoverage.Options.md).[c8Config](checkCoverage.Options.md#c8config)

___

### checkCoverage

• `Optional` **checkCoverage**: `boolean`

Whether to check that code coverage is within the specified thresholds.
This setting is ignored if option `100` is used.

**`Default`**

false

___

### cwd

• `Optional` **cwd**: `string` \| `URL`

Current working directory of the subprocess, project root of reports and base directory for
all relative paths.
Must be an absolute path.

**`Default`**

process.cwd

#### Inherited from

[Options](checkCoverage.Options.md).[cwd](checkCoverage.Options.md#cwd)

___

### exclude

• `Optional` **exclude**: `string` \| `string`[]

Glob patterns matching files that should be excluded from coverage.

**`Default`**

await import('@istanbuljs/schema/default-exclude.js')

#### Inherited from

[Options](checkCoverage.Options.md).[exclude](checkCoverage.Options.md#exclude)

___

### excludeAfterRemap

• `Optional` **excludeAfterRemap**: `boolean`

Whether to apply exclusion logic after source maps are used to remap compiled to
original source files, or before.

**`Default`**

false

#### Inherited from

[Options](checkCoverage.Options.md).[excludeAfterRemap](checkCoverage.Options.md#excludeafterremap)

___

### excludeNodeModules

• `Optional` **excludeNodeModules**: `boolean`

Whether or not to exclude all `'node_module'` folders.

**`Default`**

true

#### Inherited from

[Options](checkCoverage.Options.md).[excludeNodeModules](checkCoverage.Options.md#excludenodemodules)

___

### extension

• `Optional` **extension**: `string` \| `string`[]

Only files matching these extensions will be included in coverage.

**`Default`**

['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx']

#### Inherited from

[Options](checkCoverage.Options.md).[extension](checkCoverage.Options.md#extension)

___

### functions

• `Optional` **functions**: `number`

Percentage of functions that must be covered for the check to pass.
This setting is ignored if option `100` is used.

**`Default`**

0

#### Inherited from

[Options](checkCoverage.Options.md).[functions](checkCoverage.Options.md#functions)

___

### include

• `Optional` **include**: `string` \| `string`[]

Glob patterns matching files that should be included in coverage.
An empty array matches all files.

**`Default`**

[]

#### Inherited from

[Options](checkCoverage.Options.md).[include](checkCoverage.Options.md#include)

___

### lines

• `Optional` **lines**: `number`

Percentage of lines that must be covered for the check to pass.
This setting is ignored if option `100` is used.

**`Default`**

90

#### Inherited from

[Options](checkCoverage.Options.md).[lines](checkCoverage.Options.md#lines)

___

### perFile

• `Optional` **perFile**: `boolean`

Checks thresholds on a per-file basis.

**`Default`**

false

#### Inherited from

[Options](checkCoverage.Options.md).[perFile](checkCoverage.Options.md#perfile)

___

### reporter

• `Optional` **reporter**: `string` \| `string`[]

Coverage reporter(s) to use.

**`Default`**

'text'

___

### reportsDirectory

• `Optional` **reportsDirectory**: `string`

Directory where coverage reports will be output to.
The specified directory is ignored if none of the selected reports writes to disk.
This option is used to determine the location of `tempDirectory`, if not specified.

**`Default`**

'coverage'

#### Inherited from

[Options](checkCoverage.Options.md).[reportsDirectory](checkCoverage.Options.md#reportsdirectory)

___

### skipFull

• `Optional` **skipFull**: `boolean`

If `true`, files with 100% statement, branch, and function coverage will not be shown by
the text reporter.

**`Default`**

false

___

### src

• `Optional` **src**: `string` \| `string`[]

Overrides `cwd` as the location where source files are looked for when the option `all`
is specified.
This allows for workspaces spanning multiple projects.

#### Inherited from

[Options](checkCoverage.Options.md).[src](checkCoverage.Options.md#src)

___

### statements

• `Optional` **statements**: `number`

Percentage of statements that must be covered for the check to pass.
This setting is ignored if option `100` is used.

**`Default`**

0

#### Inherited from

[Options](checkCoverage.Options.md).[statements](checkCoverage.Options.md#statements)

___

### tempDirectory

• `Optional` **tempDirectory**: `string`

Directory where temporary V8 coverage files are written to and read from.
This directory will be created if it does not exist.
Defaults to a subdirectory named `'tmp'` in the directory specified by `reportsDirectory`.

#### Inherited from

[Options](checkCoverage.Options.md).[tempDirectory](checkCoverage.Options.md#tempdirectory)

___

### useC8Config

• `Optional` **useC8Config**: `boolean`

If `false`, c8js will not load c8 options from a `c8` section in `package.json`, or from a
JSON configuration file on disk.

**`Default`**

true

#### Inherited from

[Options](checkCoverage.Options.md).[useC8Config](checkCoverage.Options.md#usec8config)

___

### watermarks

• `Optional` **watermarks**: [`Watermarks`](Watermarks.md)

Thresholds for low and high code coverage watermarks, exposed by some reporters.

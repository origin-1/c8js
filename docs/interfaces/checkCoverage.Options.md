# Interface: Options

[checkCoverage](../modules/checkCoverage.md).Options

## Hierarchy

- `CommonOptions`

- `InheritableC8Options`

  ↳ **`Options`**

  ↳↳ [`Options`](report.Options.md)

## Table of contents

### Properties

- [100](checkCoverage.Options.md#100)
- [all](checkCoverage.Options.md#all)
- [allowExternal](checkCoverage.Options.md#allowexternal)
- [branches](checkCoverage.Options.md#branches)
- [c8Config](checkCoverage.Options.md#c8config)
- [cwd](checkCoverage.Options.md#cwd)
- [exclude](checkCoverage.Options.md#exclude)
- [excludeAfterRemap](checkCoverage.Options.md#excludeafterremap)
- [excludeNodeModules](checkCoverage.Options.md#excludenodemodules)
- [extension](checkCoverage.Options.md#extension)
- [functions](checkCoverage.Options.md#functions)
- [include](checkCoverage.Options.md#include)
- [lines](checkCoverage.Options.md#lines)
- [mergeAsync](checkCoverage.Options.md#mergeasync)
- [omitRelative](checkCoverage.Options.md#omitrelative)
- [perFile](checkCoverage.Options.md#perfile)
- [reporterOptions](checkCoverage.Options.md#reporteroptions)
- [reportsDirectory](checkCoverage.Options.md#reportsdirectory)
- [resolve](checkCoverage.Options.md#resolve)
- [skipFull](checkCoverage.Options.md#skipfull)
- [src](checkCoverage.Options.md#src)
- [statements](checkCoverage.Options.md#statements)
- [tempDirectory](checkCoverage.Options.md#tempdirectory)
- [useC8Config](checkCoverage.Options.md#usec8config)
- [wrapperLength](checkCoverage.Options.md#wrapperlength)

## Properties

### 100

• `Optional` **100**: `boolean`

Fails if coverage falls below 100%.

**`Default Value`**

`false`

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

#### Overrides

InheritableC8Options.all

___

### allowExternal

• `Optional` **allowExternal**: `boolean`

#### Inherited from

InheritableC8Options.allowExternal

___

### branches

• `Optional` **branches**: `number`

Percentage of branches that must be covered for the check to pass.
This setting is ignored if option [`100`](checkCoverage.Options.md#100) is used.

**`Default Value`**

`0`

___

### c8Config

• `Optional` **c8Config**: `string`

Path to c8 JSON configuration file.
If not provided, c8js searches for files named `'.c8rc'`, `'.c8rc.json'`, `'.nycrc'`, or
`'.nycrc.json'`, starting from `cwd` and walking up the filesystem tree.
This setting is ignored if option [`useC8Config`](checkCoverage.Options.md#usec8config) is set to `false`.

#### Inherited from

CommonOptions.c8Config

___

### cwd

• `Optional` **cwd**: `string` \| `URL`

Current working directory of the subprocess, project root of reports and base directory for
all relative paths.
Must be an absolute path.

**`Default Value`**

`process.cwd`

#### Inherited from

CommonOptions.cwd

___

### exclude

• `Optional` **exclude**: `string` \| `string`[]

Glob patterns matching files that should be excluded from coverage.

**`Default Value`**

`await import('@istanbuljs/schema/default-exclude.js')`

#### Overrides

InheritableC8Options.exclude

___

### excludeAfterRemap

• `Optional` **excludeAfterRemap**: `boolean`

Whether to apply exclusion logic after source maps are used to remap compiled to original
source files, or before.

**`Default Value`**

`false`

#### Overrides

InheritableC8Options.excludeAfterRemap

___

### excludeNodeModules

• `Optional` **excludeNodeModules**: `boolean`

Whether or not to exclude all `'node_module'` folders.

**`Default Value`**

`true`

#### Overrides

InheritableC8Options.excludeNodeModules

___

### extension

• `Optional` **extension**: `string` \| `string`[]

Only files matching these extensions will be included in coverage.

**`Default Value`**

`['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx']`

#### Overrides

InheritableC8Options.extension

___

### functions

• `Optional` **functions**: `number`

Percentage of functions that must be covered for the check to pass.
This setting is ignored if option [`100`](checkCoverage.Options.md#100) is used.

**`Default Value`**

`0`

___

### include

• `Optional` **include**: `string` \| `string`[]

Glob patterns matching files that should be included in coverage.
An empty array matches all files.

**`Default Value`**

`[]`

#### Overrides

InheritableC8Options.include

___

### lines

• `Optional` **lines**: `number`

Percentage of lines that must be covered for the check to pass.
This setting is ignored if option [`100`](checkCoverage.Options.md#100) is used.

**`Default Value`**

`90`

___

### mergeAsync

• `Optional` **mergeAsync**: `boolean`

Merges all V8 coverage reports asynchronously and incrementally to avoid OOM issues.

**`Default Value`**

`false`

___

### omitRelative

• `Optional` **omitRelative**: `boolean`

#### Inherited from

InheritableC8Options.omitRelative

___

### perFile

• `Optional` **perFile**: `boolean`

Checks thresholds on a per-file basis.

**`Default Value`**

`false`

___

### reporterOptions

• `Optional` **reporterOptions**: `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

#### Inherited from

InheritableC8Options.reporterOptions

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

CommonOptions.reportsDirectory

___

### resolve

• `Optional` **resolve**: `string`

#### Inherited from

InheritableC8Options.resolve

___

### skipFull

• `Optional` **skipFull**: `boolean`

#### Inherited from

InheritableC8Options.skipFull

___

### src

• `Optional` **src**: `string` \| `string`[]

Overrides `cwd` as the location where source files are looked for when the option `all`
is specified.
This allows for workspaces spanning multiple projects.

___

### statements

• `Optional` **statements**: `number`

Percentage of statements that must be covered for the check to pass.
This setting is ignored if option [`100`](checkCoverage.Options.md#100) is used.

**`Default Value`**

`0`

___

### tempDirectory

• `Optional` **tempDirectory**: `string`

Directory where temporary V8 coverage files are written to and read from.
This directory will be created if it does not exist.
Defaults to a subdirectory named `'tmp'` in the directory specified by
[`reportsDirectory`](checkCoverage.Options.md#reportsdirectory).

#### Inherited from

CommonOptions.tempDirectory

___

### useC8Config

• `Optional` **useC8Config**: `boolean`

If `false`, c8js will not load c8 options from a `c8` section in `'package.json'`, or from a
JSON configuration file on disk.

**`Default Value`**

`true`

#### Inherited from

CommonOptions.useC8Config

___

### wrapperLength

• `Optional` **wrapperLength**: `number`

#### Inherited from

InheritableC8Options.wrapperLength

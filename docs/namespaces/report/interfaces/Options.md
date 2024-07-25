[**c8js**](../../../README.md) • **Docs**

***

# Interface: Options

## Extends

- [`Options`](../../checkCoverage/interfaces/Options.md)

## Extended by

- [`Options`](../../default/interfaces/Options.md)

## Properties

### 100?

> `optional` **100**: `boolean`

Fails if coverage falls below 100%.

#### Default Value

`false`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`100`](../../checkCoverage/interfaces/Options.md#100)

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

[`Options`](../../checkCoverage/interfaces/Options.md).[`all`](../../checkCoverage/interfaces/Options.md#all)

***

### allowExternal?

> `optional` **allowExternal**: `boolean`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`allowExternal`](../../checkCoverage/interfaces/Options.md#allowexternal)

***

### branches?

> `optional` **branches**: `number`

Percentage of branches that must be covered for the check to pass.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`0`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`branches`](../../checkCoverage/interfaces/Options.md#branches)

***

### c8Config?

> `optional` **c8Config**: `string`

Path to c8 JSON configuration file.
If not provided, c8js searches for files named `'.c8rc'`, `'.c8rc.json'`, `'.nycrc'`, or
`'.nycrc.json'`, starting from `cwd` and walking up the filesystem tree.
This setting is ignored if option [`useC8Config`](../../checkCoverage/interfaces/Options.md#usec8config) is set to `false`.

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`c8Config`](../../checkCoverage/interfaces/Options.md#c8config)

***

### checkCoverage?

> `optional` **checkCoverage**: `boolean`

Whether to check that code coverage is within the specified thresholds.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`false`

***

### cwd?

> `optional` **cwd**: `string` \| `URL`

Current working directory of the subprocess, project root of reports and base directory for
all relative paths.
Must be an absolute path.

#### Default Value

`process.cwd`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`cwd`](../../checkCoverage/interfaces/Options.md#cwd)

***

### exclude?

> `optional` **exclude**: `string` \| `string`[]

Glob patterns matching files that should be excluded from coverage.

#### Default Value

`await import('@istanbuljs/schema/default-exclude.js')`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`exclude`](../../checkCoverage/interfaces/Options.md#exclude)

***

### excludeAfterRemap?

> `optional` **excludeAfterRemap**: `boolean`

Whether to apply exclusion logic after source maps are used to remap compiled to original
source files, or before.

#### Default Value

`false`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`excludeAfterRemap`](../../checkCoverage/interfaces/Options.md#excludeafterremap)

***

### excludeNodeModules?

> `optional` **excludeNodeModules**: `boolean`

Whether or not to exclude all `'node_module'` folders.

#### Default Value

`true`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`excludeNodeModules`](../../checkCoverage/interfaces/Options.md#excludenodemodules)

***

### extension?

> `optional` **extension**: `string` \| `string`[]

Only files matching these extensions will be included in coverage.

#### Default Value

`['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx']`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`extension`](../../checkCoverage/interfaces/Options.md#extension)

***

### functions?

> `optional` **functions**: `number`

Percentage of functions that must be covered for the check to pass.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`0`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`functions`](../../checkCoverage/interfaces/Options.md#functions)

***

### include?

> `optional` **include**: `string` \| `string`[]

Glob patterns matching files that should be included in coverage.
An empty array matches all files.

#### Default Value

`[]`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`include`](../../checkCoverage/interfaces/Options.md#include)

***

### lines?

> `optional` **lines**: `number`

Percentage of lines that must be covered for the check to pass.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`90`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`lines`](../../checkCoverage/interfaces/Options.md#lines)

***

### mergeAsync?

> `optional` **mergeAsync**: `boolean`

Merges all V8 coverage reports asynchronously and incrementally to avoid OOM issues.

#### Default Value

`false`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`mergeAsync`](../../checkCoverage/interfaces/Options.md#mergeasync)

***

### omitRelative?

> `optional` **omitRelative**: `boolean`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`omitRelative`](../../checkCoverage/interfaces/Options.md#omitrelative)

***

### perFile?

> `optional` **perFile**: `boolean`

Checks thresholds on a per-file basis.

#### Default Value

`false`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`perFile`](../../checkCoverage/interfaces/Options.md#perfile)

***

### reporter?

> `optional` **reporter**: `string` \| `string`[]

Coverage reporter(s) to use.

#### Default Value

`'text'`

***

### reporterOptions?

> `optional` **reporterOptions**: `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

An object mapping reporter names to additional options passed directly to the respective
reporters.

#### Overrides

[`Options`](../../checkCoverage/interfaces/Options.md).[`reporterOptions`](../../checkCoverage/interfaces/Options.md#reporteroptions)

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

[`Options`](../../checkCoverage/interfaces/Options.md).[`reportsDirectory`](../../checkCoverage/interfaces/Options.md#reportsdirectory)

***

### resolve?

> `optional` **resolve**: `string`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`resolve`](../../checkCoverage/interfaces/Options.md#resolve)

***

### skipFull?

> `optional` **skipFull**: `boolean`

If `true`, files with 100% statement, branch, and function coverage will not be shown by
the text reporter.

#### Default Value

`false`

#### Overrides

[`Options`](../../checkCoverage/interfaces/Options.md).[`skipFull`](../../checkCoverage/interfaces/Options.md#skipfull)

***

### src?

> `optional` **src**: `string` \| `string`[]

Overrides `cwd` as the location where source files are looked for when the option `all`
is specified.
This allows for workspaces spanning multiple projects.

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`src`](../../checkCoverage/interfaces/Options.md#src)

***

### statements?

> `optional` **statements**: `number`

Percentage of statements that must be covered for the check to pass.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`0`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`statements`](../../checkCoverage/interfaces/Options.md#statements)

***

### tempDirectory?

> `optional` **tempDirectory**: `string`

Directory where temporary V8 coverage files are written to and read from.
This directory will be created if it does not exist.
Defaults to a subdirectory named `'tmp'` in the directory specified by
[`reportsDirectory`](../../checkCoverage/interfaces/Options.md#reportsdirectory).

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`tempDirectory`](../../checkCoverage/interfaces/Options.md#tempdirectory)

***

### useC8Config?

> `optional` **useC8Config**: `boolean`

If `false`, c8js will not load c8 options from a `c8` section in `'package.json'`, or from a
JSON configuration file on disk.

#### Default Value

`true`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`useC8Config`](../../checkCoverage/interfaces/Options.md#usec8config)

***

### watermarks?

> `optional` **watermarks**: [`Watermarks`](../../../interfaces/Watermarks.md)

Thresholds for low and high code coverage watermarks, exposed by some reporters.

***

### wrapperLength?

> `optional` **wrapperLength**: `number`

#### Inherited from

[`Options`](../../checkCoverage/interfaces/Options.md).[`wrapperLength`](../../checkCoverage/interfaces/Options.md#wrapperlength)

[**c8js**](../../../README.md) • **Docs**

***

# Interface: Options

## Extends

- `CommonOptions`.`InheritableC8Options`

## Extended by

- [`Options`](../../report/interfaces/Options.md)

## Properties

### 100?

> `optional` **100**: `boolean`

Fails if coverage falls below 100%.

#### Default Value

`false`

***

### all?

> `optional` **all**: `boolean`

If `true`, all files specified with the options [`src`](Options.md#src),
[`include`](Options.md#include), [`exclude`](Options.md#exclude) and [`extension`](Options.md#extension)
will be loaded into the report.
If any of those files remain uncovered, they will be factored into the report with a
default of 0% coverage.

#### Default Value

`false`

#### Overrides

`InheritableC8Options.all`

***

### allowExternal?

> `optional` **allowExternal**: `boolean`

#### Inherited from

`InheritableC8Options.allowExternal`

***

### branches?

> `optional` **branches**: `number`

Percentage of branches that must be covered for the check to pass.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`0`

***

### c8Config?

> `optional` **c8Config**: `string`

Path to c8 JSON configuration file.
If not provided, c8js searches for files named `'.c8rc'`, `'.c8rc.json'`, `'.nycrc'`, or
`'.nycrc.json'`, starting from `cwd` and walking up the filesystem tree.
This setting is ignored if option [`useC8Config`](Options.md#usec8config) is set to `false`.

#### Inherited from

`CommonOptions.c8Config`

***

### cwd?

> `optional` **cwd**: `string` \| `URL`

Current working directory of the subprocess, project root of reports and base directory for
all relative paths.
Must be an absolute path.

#### Default Value

`process.cwd`

#### Inherited from

`CommonOptions.cwd`

***

### exclude?

> `optional` **exclude**: `string` \| `string`[]

Glob patterns matching files that should be excluded from coverage.

#### Default Value

`await import('@istanbuljs/schema/default-exclude.js')`

#### Overrides

`InheritableC8Options.exclude`

***

### excludeAfterRemap?

> `optional` **excludeAfterRemap**: `boolean`

Whether to apply exclusion logic after source maps are used to remap compiled to original
source files, or before.

#### Default Value

`false`

#### Overrides

`InheritableC8Options.excludeAfterRemap`

***

### excludeNodeModules?

> `optional` **excludeNodeModules**: `boolean`

Whether or not to exclude all `'node_module'` folders.

#### Default Value

`true`

#### Overrides

`InheritableC8Options.excludeNodeModules`

***

### extension?

> `optional` **extension**: `string` \| `string`[]

Only files matching these extensions will be included in coverage.

#### Default Value

`['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx']`

#### Overrides

`InheritableC8Options.extension`

***

### functions?

> `optional` **functions**: `number`

Percentage of functions that must be covered for the check to pass.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`0`

***

### include?

> `optional` **include**: `string` \| `string`[]

Glob patterns matching files that should be included in coverage.
An empty array matches all files.

#### Default Value

`[]`

#### Overrides

`InheritableC8Options.include`

***

### lines?

> `optional` **lines**: `number`

Percentage of lines that must be covered for the check to pass.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`90`

***

### mergeAsync?

> `optional` **mergeAsync**: `boolean`

Merges all V8 coverage reports asynchronously and incrementally to avoid OOM issues.

#### Default Value

`false`

***

### omitRelative?

> `optional` **omitRelative**: `boolean`

#### Inherited from

`InheritableC8Options.omitRelative`

***

### perFile?

> `optional` **perFile**: `boolean`

Checks thresholds on a per-file basis.

#### Default Value

`false`

***

### reporterOptions?

> `optional` **reporterOptions**: `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

#### Inherited from

`InheritableC8Options.reporterOptions`

***

### reportsDirectory?

> `optional` **reportsDirectory**: `string`

Directory where coverage reports will be output to.
The specified directory is ignored if none of the selected reports writes to disk.
This option is used to determine the location of [`tempDirectory`](Options.md#tempdirectory), if
not specified.

#### Default Value

`'coverage'`

#### Inherited from

`CommonOptions.reportsDirectory`

***

### resolve?

> `optional` **resolve**: `string`

#### Inherited from

`InheritableC8Options.resolve`

***

### skipFull?

> `optional` **skipFull**: `boolean`

#### Inherited from

`InheritableC8Options.skipFull`

***

### src?

> `optional` **src**: `string` \| `string`[]

Overrides `cwd` as the location where source files are looked for when the option `all`
is specified.
This allows for workspaces spanning multiple projects.

***

### statements?

> `optional` **statements**: `number`

Percentage of statements that must be covered for the check to pass.
This setting is ignored if option [`100`](Options.md#100) is used.

#### Default Value

`0`

***

### tempDirectory?

> `optional` **tempDirectory**: `string`

Directory where temporary V8 coverage files are written to and read from.
This directory will be created if it does not exist.
Defaults to a subdirectory named `'tmp'` in the directory specified by
[`reportsDirectory`](Options.md#reportsdirectory).

#### Inherited from

`CommonOptions.tempDirectory`

***

### useC8Config?

> `optional` **useC8Config**: `boolean`

If `false`, c8js will not load c8 options from a `c8` section in `'package.json'`, or from a
JSON configuration file on disk.

#### Default Value

`true`

#### Inherited from

`CommonOptions.useC8Config`

***

### wrapperLength?

> `optional` **wrapperLength**: `number`

#### Inherited from

`InheritableC8Options.wrapperLength`

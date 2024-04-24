# c8js

## Table of contents

### Namespaces

- [checkCoverage](modules/checkCoverage.md)
- [default](modules/default.md)
- [exec](modules/exec.md)
- [report](modules/report.md)

### Classes

- [LowCoverageError](classes/LowCoverageError.md)

### Interfaces

- [Fail](interfaces/Fail.md)
- [Watermarks](interfaces/Watermarks.md)

### Type Aliases

- [Watermark](modules.md#watermark)

### Variables

- [commands](modules.md#commands)
- [version](modules.md#version)

### Functions

- [checkCoverage](modules.md#checkcoverage)
- [default](modules.md#default)
- [exec](modules.md#exec)
- [report](modules.md#report)

## Type Aliases

### Watermark

Ƭ **Watermark**: [low: number, high: number]

Thresholds for low and high code coverage watermarks, in percentage.

## Variables

### commands

• `Const` **commands**: `Object`

Common commands for c8js.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Promise`\<`string`\> | A new promise that resolves to the path of node. |
| `npm` | `Promise`\<`string`\> | A new promise that resolves to the path of npm. |
| `npx` | `Promise`\<`string`\> | A new promise that resolves to the path of npx. |

___

### version

• `Const` **version**: `string`

The version string of c8js.

## Functions

### checkCoverage

▸ **checkCoverage**(`options?`): `Promise`\<`void`\>

Checks that code coverage is within the specified thresholds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`Options`](interfaces/checkCoverage.Options.md) & `Partial`\<[`Options`](interfaces/default.Options.md)\> | Options for the function. |

#### Returns

`Promise`\<`void`\>

A promise that resolves if code coverage is within the thresholds, and rejects if an error
occurs.
If code coverage is under the specified thresholds, the promise will reject with a [`LowCoverageError`](classes/LowCoverageError.md).

___

### default

▸ **default**(`command`, `options?`): `Promise`\<[`Result`](interfaces/default.Result.md)\>

Executes a command, generates a coverage report and optionally checks that code coverage is
within the specified thresholds.

By default, if the command exits with a nonzero code this function will throw an error without
generating a coverage report.
This behavior can be changed with the option
[`throwExecError`](interfaces/exec.Options.md#throwexecerror).

This function does not spawn a shell to parse the command line, so don't put any additional
spaces or quotes around the command or the arguments.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `command` | `string` \| `Promise`\<`string`\> | The command to run. This can be a binary executable or a Node.js module. If a promise is specified, the resolved value will be used. |
| `options?` | [`Options`](interfaces/default.Options.md) | Options for the function. |

#### Returns

`Promise`\<[`Result`](interfaces/default.Result.md)\>

A promise that settles after the command has terminated.
The promise will resolve with an object similar to the return value of
[`child_process.spawnSync`](
https://nodejs.org/api/child_process.html#child_processspawnsynccommand-args-options) with an
additional property holding the coverage map.
If the option [`checkCoverage`](interfaces/report.Options.md#checkcoverage) (or [[100] `100`](interfaces/checkCoverage.Options.md)) is set to `true` and code coverage is under the specified
thresholds, the promise will reject with a [`LowCoverageError`](classes/LowCoverageError.md).

▸ **default**(`command`, `args?`, `options?`): `Promise`\<[`Result`](interfaces/default.Result.md)\>

Executes a command, generates a coverage report and optionally checks that code coverage is
within the specified thresholds.

By default, if the command exits with a nonzero code this function will throw an error without
generating a coverage report.
This behavior can be changed with the option
[`throwExecError`](interfaces/exec.Options.md#throwexecerror).

This function does not spawn a shell to parse the command line, so don't put any additional
spaces or quotes around the command or the arguments.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `command` | `string` \| `Promise`\<`string`\> | The command to run. This can be a binary executable or a Node.js module. If a promise is specified, the resolved value will be used. |
| `args?` | readonly `string`[] | A list of arguments passed to the command. |
| `options?` | [`Options`](interfaces/default.Options.md) | Options for the function. |

#### Returns

`Promise`\<[`Result`](interfaces/default.Result.md)\>

A promise that settles after the command has terminated.
The promise will resolve with an object similar to the return value of
[`child_process.spawnSync`](
https://nodejs.org/api/child_process.html#child_processspawnsynccommand-args-options) with an
additional property holding the coverage map.
If the option [`checkCoverage`](interfaces/report.Options.md#checkcoverage) (or [[100] `100`](interfaces/checkCoverage.Options.md)) is set to `true` and code coverage is under the specified
thresholds, the promise will reject with a [`LowCoverageError`](classes/LowCoverageError.md).

___

### exec

▸ **exec**(`command`, `options?`): `Promise`\<[`Result`](interfaces/exec.Result.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `string` \| `Promise`\<`string`\> |
| `options?` | [`Options`](interfaces/exec.Options.md) & `Partial`\<[`Options`](interfaces/default.Options.md)\> |

#### Returns

`Promise`\<[`Result`](interfaces/exec.Result.md)\>

▸ **exec**(`command`, `args?`, `options?`): `Promise`\<[`Result`](interfaces/exec.Result.md)\>

Executes a command, ensuring that temporary code coverage data is created.

This function does not spawn a shell to parse the command line, so don't put any additional
spaces or quotes around the command or the arguments.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `command` | `string` \| `Promise`\<`string`\> | The command to run. This can be a binary executable or a Node.js module. If a promise is specified, the resolved value will be used. |
| `args?` | readonly `string`[] | A list of arguments passed to the command. |
| `options?` | [`Options`](interfaces/exec.Options.md) & `Partial`\<[`Options`](interfaces/default.Options.md)\> | Options for the function. |

#### Returns

`Promise`\<[`Result`](interfaces/exec.Result.md)\>

A promise that settles after the command has terminated.
The promise will resolve with an object similar to the return value of
[`child_process.spawnSync`](
https://nodejs.org/api/child_process.html#child_processspawnsynccommand-args-options).

___

### report

▸ **report**(`options?`): `Promise`\<`CoverageMap`\>

Generates a coverage report and optionally checks that code coverage is within the specified
thresholds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`Options`](interfaces/report.Options.md) & `Partial`\<[`Options`](interfaces/default.Options.md)\> | Options for the function. |

#### Returns

`Promise`\<`CoverageMap`\>

A promise that resolves with a coverage map, and rejects if an error occurs.
If the option [`checkCoverage`](interfaces/report.Options.md#checkcoverage) (or [[100] `100`](interfaces/checkCoverage.Options.md)) is set to `true` and code coverage is under the specified
thresholds, the promise will reject with a [`LowCoverageError`](classes/LowCoverageError.md).

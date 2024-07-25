[**c8js**](../README.md) • **Docs**

***

# Function: default()

Executes a command, generates a coverage report and optionally checks that code coverage is
within the specified thresholds.

By default, if the command exits with a nonzero code this function will throw an error without
generating a coverage report.
This behavior can be changed with the option
[`throwExecError`](../namespaces/exec/interfaces/Options.md#throwexecerror).

This function does not spawn a shell to parse the command line, so don't put any additional
spaces or quotes around the command or the arguments.

## Param

The command to run.
This can be a binary executable or a Node.js module.
If a promise is specified, the resolved value will be used.

## Param

A list of arguments passed to the command.

## Param

Options for the function.

## default(command, options)

> **default**(`command`, `options`?): `Promise`\<[`Result`](../namespaces/default/interfaces/Result.md)\>

Executes a command, generates a coverage report and optionally checks that code coverage is
within the specified thresholds.

By default, if the command exits with a nonzero code this function will throw an error without
generating a coverage report.
This behavior can be changed with the option
[`throwExecError`](../namespaces/exec/interfaces/Options.md#throwexecerror).

This function does not spawn a shell to parse the command line, so don't put any additional
spaces or quotes around the command or the arguments.

### Parameters

• **command**: `string` \| `Promise`\<`string`\>

• **options?**: [`Options`](../namespaces/default/interfaces/Options.md)

### Returns

`Promise`\<[`Result`](../namespaces/default/interfaces/Result.md)\>

### Param

The command to run.
This can be a binary executable or a Node.js module.
If a promise is specified, the resolved value will be used.

### Param

A list of arguments passed to the command.

### Param

Options for the function.

## default(command, args, options)

> **default**(`command`, `args`?, `options`?): `Promise`\<[`Result`](../namespaces/default/interfaces/Result.md)\>

Executes a command, generates a coverage report and optionally checks that code coverage is
within the specified thresholds.

By default, if the command exits with a nonzero code this function will throw an error without
generating a coverage report.
This behavior can be changed with the option
[`throwExecError`](../namespaces/exec/interfaces/Options.md#throwexecerror).

This function does not spawn a shell to parse the command line, so don't put any additional
spaces or quotes around the command or the arguments.

### Parameters

• **command**: `string` \| `Promise`\<`string`\>

• **args?**: readonly `string`[]

• **options?**: [`Options`](../namespaces/default/interfaces/Options.md)

### Returns

`Promise`\<[`Result`](../namespaces/default/interfaces/Result.md)\>

### Param

The command to run.
This can be a binary executable or a Node.js module.
If a promise is specified, the resolved value will be used.

### Param

A list of arguments passed to the command.

### Param

Options for the function.

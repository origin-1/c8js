[**c8js**](../README.md) • **Docs**

***

# Function: exec()

## exec(command, options)

> **exec**(`command`, `options`?): `Promise`\<[`Result`](../namespaces/exec/type-aliases/Result.md)\>

### Parameters

• **command**: `string` \| `Promise`\<`string`\>

• **options?**: [`Options`](../namespaces/exec/interfaces/Options.md) & `Partial`\<[`Options`](../namespaces/default/interfaces/Options.md)\>

### Returns

`Promise`\<[`Result`](../namespaces/exec/type-aliases/Result.md)\>

## exec(command, args, options)

> **exec**(`command`, `args`?, `options`?): `Promise`\<[`Result`](../namespaces/exec/type-aliases/Result.md)\>

Executes a command, ensuring that temporary code coverage data is created.

This function does not spawn a shell to parse the command line, so don't put any additional
spaces or quotes around the command or the arguments.

### Parameters

• **command**: `string` \| `Promise`\<`string`\>

The command to run.
This can be a binary executable or a Node.js module.
If a promise is specified, the resolved value will be used.

• **args?**: readonly `string`[]

A list of arguments passed to the command.

• **options?**: [`Options`](../namespaces/exec/interfaces/Options.md) & `Partial`\<[`Options`](../namespaces/default/interfaces/Options.md)\>

Options for the function.

### Returns

`Promise`\<[`Result`](../namespaces/exec/type-aliases/Result.md)\>

A promise that settles after the command has terminated.
The promise will resolve with an object similar to the return value of
[`child_process.spawnSync`](
https://nodejs.org/api/child_process.html#child_processspawnsynccommand-args-options).

[**c8js**](../../../README.md) • **Docs**

***

# Interface: Options

## Extends

- `CommonOptions`.`ProcessEnvOptions`

## Extended by

- [`Options`](../../default/interfaces/Options.md)

## Properties

### c8Config?

> `optional` **c8Config**: `string`

Path to c8 JSON configuration file.
If not provided, c8js searches for files named `'.c8rc'`, `'.c8rc.json'`, `'.nycrc'`, or
`'.nycrc.json'`, starting from `cwd` and walking up the filesystem tree.
This setting is ignored if option [`useC8Config`](../../checkCoverage/interfaces/Options.md#usec8config) is set to `false`.

#### Inherited from

`CommonOptions.c8Config`

***

### clean?

> `optional` **clean**: `boolean`

If `false`, temporary V8 coverage files will not be deleted before subprocess execution.

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

`CommonOptions.cwd`

***

### encoding?

> `optional` **encoding**: `null` \| `"buffer"` \| `BufferEncoding`

The character encoding used to decode the stdout and stderr output.
If `'buffer'`, or an unrecognized character encoding is specified, `Buffer` objects will
be returned instead of strings.

#### Default Value

`'utf8'`

***

### env?

> `optional` **env**: `ProcessEnv`

Environment key-value pairs.

#### Default Value

`process.env`

#### Overrides

`ProcessEnvOptions.env`

***

### gid?

> `optional` **gid**: `number`

Sets the group identity of the process.

#### Overrides

`ProcessEnvOptions.gid`

***

### killSignal?

> `optional` **killSignal**: `number` \| `Signals`

The signal value used to kill the subprocess in case of timeout, buffer overflow, or when
the current process exits.

#### Default Value

`'SIGTERM'`

***

### maxBuffer?

> `optional` **maxBuffer**: `number`

Largest amount of data in bytes allowed on stdout or stderr.
If exceeded, the subprocess is terminated and any output is truncated.

#### Default Value

`1024 * 1024`

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

`CommonOptions.reportsDirectory`

***

### silent?

> `optional` **silent**: `boolean`

If `true`, stdin, stdout, and stderr of the subprocess will be piped to the current
process, otherwise they will be inherited from the current process.

#### Default Value

`false`

***

### tempDirectory?

> `optional` **tempDirectory**: `string`

Directory where temporary V8 coverage files are written to and read from.
This directory will be created if it does not exist.
Defaults to a subdirectory named `'tmp'` in the directory specified by
[`reportsDirectory`](../../checkCoverage/interfaces/Options.md#reportsdirectory).

#### Inherited from

`CommonOptions.tempDirectory`

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

***

### timeout?

> `optional` **timeout**: `number`

The maximum amount of time the process is allowed to run in milliseconds.
A non-positive value means no time limit.

#### Default Value

`undefined`

***

### uid?

> `optional` **uid**: `number`

Sets the user identity of the process.

#### Overrides

`ProcessEnvOptions.uid`

***

### useC8Config?

> `optional` **useC8Config**: `boolean`

If `false`, c8js will not load c8 options from a `c8` section in `'package.json'`, or from a
JSON configuration file on disk.

#### Default Value

`true`

#### Inherited from

`CommonOptions.useC8Config`

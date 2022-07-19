# Interface: Options

[exec](../modules/exec.md).Options

## Hierarchy

- `CommonOptions`

- `ProcessEnvOptions`

  ↳ **`Options`**

  ↳↳ [`Options`](default.Options.md)

## Table of contents

### Properties

- [c8Config](exec.Options.md#c8config)
- [clean](exec.Options.md#clean)
- [cwd](exec.Options.md#cwd)
- [encoding](exec.Options.md#encoding)
- [env](exec.Options.md#env)
- [failFast](exec.Options.md#failfast)
- [gid](exec.Options.md#gid)
- [killSignal](exec.Options.md#killsignal)
- [maxBuffer](exec.Options.md#maxbuffer)
- [reportsDirectory](exec.Options.md#reportsdirectory)
- [silent](exec.Options.md#silent)
- [tempDirectory](exec.Options.md#tempdirectory)
- [timeout](exec.Options.md#timeout)
- [uid](exec.Options.md#uid)
- [useC8Config](exec.Options.md#usec8config)

## Properties

### c8Config

• `Optional` **c8Config**: `string`

Path to c8 JSON configuration file.
If not provided, c8js searches for files named `.c8rc`, `.c8rc.json`, `.nycrc`, or
`.nycrc.json`, starting from `cwd` and walking up the filesystem tree.
This setting is ignored if option `useC8Config` is set to `false`.

#### Inherited from

CommonOptions.c8Config

___

### clean

• `Optional` **clean**: `boolean`

If `false`, temporary V8 coverage files will not be deleted before subprocess execution.

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

CommonOptions.cwd

___

### encoding

• `Optional` **encoding**: ``null`` \| ``"buffer"`` \| `BufferEncoding`

The encoding used for all stdio inputs and outputs.

**`Default`**

'utf8'

___

### env

• `Optional` **env**: `ProcessEnv`

Environment key-value pairs.

**`Default`**

process.env

#### Overrides

ProcessEnvOptions.env

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

___

### gid

• `Optional` **gid**: `number`

Sets the group identity of the process.

#### Overrides

ProcessEnvOptions.gid

___

### killSignal

• `Optional` **killSignal**: `number` \| `Signals`

The signal value used to kill the subprocess in case of timeout or buffer overflow.

**`Default`**

'SIGTERM'

___

### maxBuffer

• `Optional` **maxBuffer**: `number`

Largest amount of data in bytes allowed on stdout or stderr. If exceeded, the subprocess
is terminated and any output is truncated.

**`Default`**

1024 * 1024

___

### reportsDirectory

• `Optional` **reportsDirectory**: `string`

Directory where coverage reports will be output to.
The specified directory is ignored if none of the selected reports writes to disk.
This option is used to determine the location of `tempDirectory`, if not specified.

**`Default`**

'coverage'

#### Inherited from

CommonOptions.reportsDirectory

___

### silent

• `Optional` **silent**: `boolean`

If `true`, stdin, stdout, and stderr of the subprocess will be piped to the current
process, otherwise they will be inherited from the current process.

**`Default`**

false

___

### tempDirectory

• `Optional` **tempDirectory**: `string`

Directory where temporary V8 coverage files are written to and read from.
This directory will be created if it does not exist.
Defaults to a subdirectory named `'tmp'` in the directory specified by `reportsDirectory`.

#### Inherited from

CommonOptions.tempDirectory

___

### timeout

• `Optional` **timeout**: `number`

The maximum amount of time the process is allowed to run in milliseconds.
A non-positive value means no time limit.

**`Default`**

undefined

___

### uid

• `Optional` **uid**: `number`

Sets the user identity of the process.

#### Overrides

ProcessEnvOptions.uid

___

### useC8Config

• `Optional` **useC8Config**: `boolean`

If `false`, c8js will not load c8 options from a `c8` section in `package.json`, or from a
JSON configuration file on disk.

**`Default`**

true

#### Inherited from

CommonOptions.useC8Config

[**c8js**](../../README.md) • **Docs**

***

# default

Executes a command, generates a coverage report and optionally checks that code coverage is
within the specified thresholds.

By default, if the command exits with a nonzero code this function will throw an error without
generating a coverage report.
This behavior can be changed with the option
[`throwExecError`](../exec/interfaces/Options.md#throwexecerror).

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

## Index

### Interfaces

- [Options](interfaces/Options.md)
- [Result](interfaces/Result.md)

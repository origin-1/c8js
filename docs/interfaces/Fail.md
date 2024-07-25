[**c8js**](../README.md) • **Docs**

***

# Interface: Fail

A shortfall in code coverage.

## Properties

### coverage

> **coverage**: `number`

The actual code coverage for the specified measure, in percentage.

***

### fileName

> **fileName**: `null` \| `string`

The relative path of the file failing code coverage check if the option `perFile` was set to
`true`, or `null` otherwise.

***

### key

> **key**: `"branches"` \| `"functions"` \| `"lines"` \| `"statements"`

The measure failing code coverage check.
It can be one of `'branches'`, `'functions'`, `'lines'`, or `'statements'`.

***

### threshold

> **threshold**: `number`

The threshold for the specified measure, in percentage.

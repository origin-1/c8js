# Interface: Fail

A shortfall in code coverage.

## Table of contents

### Properties

- [coverage](Fail.md#coverage)
- [fileName](Fail.md#filename)
- [key](Fail.md#key)
- [threshold](Fail.md#threshold)

## Properties

### coverage

• **coverage**: `number`

The actual code coverage for the specified measure, in percentage.

___

### fileName

• **fileName**: ``null`` \| `string`

The relative path of the file failing code coverage check if the option `perFile` was set to
`true`, or `null` otherwise.

___

### key

• **key**: ``"branches"`` \| ``"functions"`` \| ``"lines"`` \| ``"statements"``

The measure failing code coverage check.
It can be one of `'branches'`, `'functions'`, `'lines'`, or `'statements'`.

___

### threshold

• **threshold**: `number`

The threshold for the specified measure, in percentage.

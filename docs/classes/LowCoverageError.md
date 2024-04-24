# Class: LowCoverageError

Error thrown when code coverage is under the specified thresholds.

## Hierarchy

- `Error`

  ↳ **`LowCoverageError`**

## Table of contents

### Constructors

- [constructor](LowCoverageError.md#constructor)

### Properties

- [fails](LowCoverageError.md#fails)
- [message](LowCoverageError.md#message)
- [name](LowCoverageError.md#name)
- [stack](LowCoverageError.md#stack)
- [prepareStackTrace](LowCoverageError.md#preparestacktrace)
- [stackTraceLimit](LowCoverageError.md#stacktracelimit)

### Methods

- [captureStackTrace](LowCoverageError.md#capturestacktrace)

## Constructors

### constructor

• **new LowCoverageError**(`message?`): [`LowCoverageError`](LowCoverageError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Returns

[`LowCoverageError`](LowCoverageError.md)

#### Inherited from

Error.constructor

## Properties

### fails

• **fails**: [`Fail`](../interfaces/Fail.md)[]

A list of shortfalls in code coverage.

___

### message

• **message**: `string`

#### Inherited from

Error.message

___

### name

• **name**: `string`

#### Inherited from

Error.name

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

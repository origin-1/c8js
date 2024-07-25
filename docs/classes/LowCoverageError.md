[**c8js**](../README.md) • **Docs**

***

# Class: LowCoverageError

Error thrown when code coverage is under the specified thresholds.

## Extends

- `Error`

## Constructors

### new LowCoverageError()

> **new LowCoverageError**(`message`?): [`LowCoverageError`](LowCoverageError.md)

#### Parameters

• **message?**: `string`

#### Returns

[`LowCoverageError`](LowCoverageError.md)

#### Inherited from

`Error.constructor`

## Properties

### fails

> **fails**: [`Fail`](../interfaces/Fail.md)[]

A list of shortfalls in code coverage.

***

### message

> **message**: `string`

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

#### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

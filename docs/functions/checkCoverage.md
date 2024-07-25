[**c8js**](../README.md) • **Docs**

***

# Function: checkCoverage()

> **checkCoverage**(`options`?): `Promise`\<`void`\>

Checks that code coverage is within the specified thresholds.

## Parameters

• **options?**: [`Options`](../namespaces/checkCoverage/interfaces/Options.md) & `Partial`\<[`Options`](../namespaces/default/interfaces/Options.md)\>

Options for the function.

## Returns

`Promise`\<`void`\>

A promise that resolves if code coverage is within the thresholds, and rejects if an error
occurs.
If code coverage is under the specified thresholds, the promise will reject with a [`LowCoverageError`](../classes/LowCoverageError.md).

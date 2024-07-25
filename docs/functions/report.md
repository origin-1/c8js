[**c8js**](../README.md) • **Docs**

***

# Function: report()

> **report**(`options`?): `Promise`\<`CoverageMap`\>

Generates a coverage report and optionally checks that code coverage is within the specified
thresholds.

## Parameters

• **options?**: [`Options`](../namespaces/report/interfaces/Options.md) & `Partial`\<[`Options`](../namespaces/default/interfaces/Options.md)\>

Options for the function.

## Returns

`Promise`\<`CoverageMap`\>

A promise that resolves with a coverage map, and rejects if an error occurs.
If the option [`checkCoverage`](../namespaces/report/interfaces/Options.md#checkcoverage) (or [[100] `100`](../namespaces/checkCoverage/interfaces/Options.md)) is set to `true` and code coverage is under the specified
thresholds, the promise will reject with a [`LowCoverageError`](../classes/LowCoverageError.md).

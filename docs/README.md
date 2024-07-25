**c8js** • [**Docs**](globals.md)

***

# c8js

A modern, asynchronous Node.js API for [c8](https://github.com/bcoe/c8).

[![npm version][npm badge]][npm url]

c8 leverages Node.js built-in [V8 JavaScript code coverage](https://v8.dev/blog/javascript-code-coverage) to produce [Istanbul](https://istanbul.js.org/)-compatible reports.

c8js offers a usable API to access all c8 commands programmatically in Node.js with JavaScript functions.

c8js is not a wrapper around the command line interface: it calls c8 library functions in the current thread instead of spawning an instrumenter process.

![Comparison without/with c8js](_media/comparison.svg)

## Installation

Use [`npm install`](https://docs.npmjs.com/cli/install):

`npm i -D c8js`

## Usage

c8js exports the functions [`c8js`](https://origin-1.github.io/c8js/modules.html#default) (the default export), [`report`](https://origin-1.github.io/c8js/modules.html#report), and [`checkCoverage`](https://origin-1.github.io/c8js/modules.html#checkcoverage), in place of the commands `c8`, `c8 report`, and `c8 check-coverage` respectively.
Additionally, c8js exports the function [`exec`](https://origin-1.github.io/c8js/modules.html#exec) that just runs a command and saves V8 coverage data.

While c8 commands accept inline arguments, c8js functions accept in-code options.
All [c8js options](https://origin-1.github.io/c8js/interfaces/default.Options.html) can be used in-code with all functions, but some options are only relevant to some of the functions.
In-code options override options defined in .c8rc or another configuration file.

An important difference is that all c8js functions throw exceptions in situations where c8 commands would terminate the process with a nonzero exit code.

For detailed usage information, see the [**API documentation**](https://origin-1.github.io/c8js/modules).

## Examples

### Run Mocha

This will run `mocha --check-leaks --timeout=10000 test/*.spec.js` and produce `html` and `text-summary` coverage reports.

```js
async function runMocha()
{
    const { default: c8js } = await import('c8js');
    await c8js
    (
        'node_modules/mocha/bin/mocha.js',
        ['--check-leaks', '--timeout=10000', 'test/*.spec.js'],
        { reporter: ['html', 'text-summary'] },
    );
}
```

### Run with `npx`

Similar to the previous example, but uses `npx` to locate and run Mocha.
`npx` will download packages from the npm registry if necessary.

```js
async function runMocha()
{
    const { default: c8js, commands } = await import('c8js');
    await c8js
    (
        commands.npx,
        ['mocha', '--check-leaks', '--timeout=10000', 'test/*.spec.js'],
        { reporter: ['html', 'text-summary'] },
    );
}
```

### Run `npm test`

This will run `npm test` with the default coverage options.

```js
async function runTest()
{
    const { default: c8js, commands } = await import('c8js');
    await c8js(commands.npm, ['test']);
}
```

### Run `node --test` (Node.js ≥ 18.1)

Node.js 18.1 introduces the command line flag `--test` that launches the built-in [Test runner](https://nodejs.org/dist/latest/docs/api/test.html).
The following function shows how to run `node --test` with default coverage options.

```js
async function runTest()
{
    const { default: c8js } = await import('c8js');
    await c8js(process.execPath, ['--test']);
}
```

**NOTE:** Some versions of Node.js contain [a bug](https://github.com/nodejs/node/issues/45013) that causes `node --test` to crash when run from c8.
The affected Node.js versions are 18.11.0, 18.12.0, 18.12.1, 19.0.0 and 19.0.1.

### Sharing Options

To use c8js in different build scripts or packages with similar settings, it is useful to export a function that calls c8js with the set of shared options.
This function can be imported by each build script and invoked with specific parameters.

```js
// create-coverage.js
export async function createCoverage(options)
{
    const { default: c8js, commands } = await import('c8js');
    await c8js
    (
        commands.npm,
        ['test'],
        {
            all:            true,
            src:            'lib',
            throwExecError: 'late',
            watermarks:
            {
                branches:   [90, 100],
                functions:  [90, 100],
                lines:      [90, 100],
                statements: [90, 100],
            },
            ...options,
        }
    );
}
```

```js
// build.js
import { createCoverage } from './create-coverage.js';

await createCoverage({ src: ['lib', 'src/app'], timeout: 300 * 1000 });
```

## Compatibility

c8js requires Node.js 16 or later.
The minimum supported c8 version is 8.0.0.

[npm badge]: https://img.shields.io/npm/v/c8js?logo=npm
[npm url]: https://www.npmjs.com/package/c8js

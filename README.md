# c8js

A modern, asynchronous Node.js API for [c8](https://github.com/bcoe/c8).

[![npm version][npm badge]][npm url]

c8 leverages Node.js built-in [V8 JavaScript code coverage](https://v8.dev/blog/javascript-code-coverage) to produce [Istanbul](https://istanbul.js.org/)-compatible reports.

c8js offers a usable API to access all c8 commands programmatically in Node.js with JavaScript functions.

c8js is not a wrapper around the command line interface: it calls c8 library functions in the current thread instead of spawning an instrumenter process.

## Installation

Use [`npm install`](https://docs.npmjs.com/cli/install):

`npm i -D c8js`

## Usage

c8js exports the functions `c8js` (the default export), `report`, and `checkCoverage`, in place of the commands `c8`, `c8 report`, and `c8 check-coverage` respectively.
Additionally, c8js exports the function `exec` that just runs a command and saves V8 coverage data.

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

## Compatibility

c8js requires Node.js 14 or later.

[npm badge]: https://badge.fury.io/js/c8js.svg
[npm url]: https://www.npmjs.com/package/c8js

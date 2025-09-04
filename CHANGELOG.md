<a name="v0.8.1"></a>
## [v0.8.1](https://github.com/origin-1/c8js/releases/tag/v0.8.1) (2025-09-04)

* Added support for c8 v.10.1.3.

<a name="v0.8.0"></a>
## [v0.8.0](https://github.com/origin-1/c8js/releases/tag/v0.8.0) (2024-07-25)

* Dropped support for Node.js < 16.
* Added support for c8 versions up until 10.1.2.
* Backslashes ("\\") in Unix file names are no longer replaced with forward slashes ("/") in the `Fail` objects of a `LowCoverageError`.

<a name="v0.7.0"></a>
## [v0.7.0](https://github.com/origin-1/c8js/releases/tag/v0.7.0) (2024-04-24)

* On Windows, `commands.npm` and `commands.npx` will now resolve to the path of a .js file, not a .cmd file like in previous versions of c8js. This is because new versions of Node.js prevent the execution of .cmd files on Windows when no shell process is spawned (see [the announcement](https://nodejs.org/en/blog/vulnerability/april-2024-security-releases-2)).
* Fixed documentation pages.

<a name="v0.6.2"></a>
## [v0.6.2](https://github.com/origin-1/c8js/releases/tag/v0.6.2) (2024-02-06)

* Added support for c8 9.1.0.

<a name="v0.6.1"></a>
## [v0.6.1](https://github.com/origin-1/c8js/releases/tag/v0.6.1) (2024-01-05)

* Added support for c8 9.0.0.
* Removed unused transitive dependency [foreground-child](https://www.npmjs.com/package/foreground-child).
* Updated documentation.

<a name="v0.6.0"></a>
## [v0.6.0](https://github.com/origin-1/c8js/releases/tag/v0.6.0) (2023-07-28)

* Added CommonJS export.
* When the option `perFile` is set to `true`, a thrown `LowCoverageError` will contain a list of
all fails, not just of the fails in one file.
* Added type definitions and API documentation for the types `LowCoverageError` and `Fail`.
* Upgraded c8 to version 8.

<a name="v0.5.0"></a>
## [v0.5.0](https://github.com/origin-1/c8js/releases/tag/v0.5.0) (2023-06-09)

* New option `mergeAsync`, added in c8 7.14.0.
* Updated npm badge.

<a name="v0.4.0"></a>
## [v0.4.0](https://github.com/origin-1/c8js/releases/tag/v0.4.0) (2023-02-17)

* New option `reporterOptions`, added in c8 7.13.0.
* Improved documentation.

<a name="v0.3.0"></a>
## [v0.3.0](https://github.com/origin-1/c8js/releases/tag/v0.3.0) (2022-09-26)

* Fix: c8js works again in Node.js < 14.13.
* The new option `throwExecError` has replaced `failFast`.
* All c8js functions now throw an exception when passed unknown options.
* Added lazy validation for the options `killSignal`, `maxBuffer` and `timeout`.
* Signals sent to the process running c8js are no longer passed down to a subprocess.
* When a process running c8js exits while a subprocess is still running, the subprocess will be sent the signal specified by the option `killSignal`. Previously, it would always be sent `'SIGHUP'` or `'SIGTERM'`.
* Improved performance when the option `maxBuffer` is set to `Infinity`.
* Extended documentation.
* Linking to the new homepage.
* Removed a few unused dependencies.

<a name="v0.2.1"></a>
## [v0.2.1](https://github.com/origin-1/c8js/releases/tag/v0.2.1) (2022-06-18)

* Improved stack traces for errors occurring during subprocess execution.

<a name="v0.2.0"></a>
## [v0.2.0](https://github.com/origin-1/c8js/releases/tag/v0.2.0) (2022-06-06)

* Transferred project to [Origin₁](https://github.com/origin-1).
* Publishing [API documentation](https://origin-1.github.io/c8js/) on GitHub Pages.
* Improved readme file.
* Updated TypeScript type declaration for `commands`.

<a name="v0.1.0"></a>
## [v0.1.0](https://github.com/origin-1/c8js/releases/tag/v0.1.0) (2022-05-25)

* New option `useC8Config`.
* Fix: c8 options defined in package.json files are no longer cached across unrelated invocations.
* Added TypeScript type declaration for option `c8Config`.
* Added license file.
* npm badge in readme file.

<a name="v0.0.0"></a>
## [v0.0.0](https://github.com/origin-1/c8js/releases/tag/v0.0.0) (2022-05-21)

First release.

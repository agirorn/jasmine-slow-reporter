[![npm version](https://badge.fury.io/js/jasmine-slow-reporter.svg)](https://badge.fury.io/js/jasmine-slow-reporter)
[![Build Status](https://travis-ci.org/agirorn/jasmine-slow-reporter.svg?branch=master)](https://travis-ci.org/agirorn/jasmine-slow-reporter)

# Jasmine Slow Reporter

> Reporter for Jasmine to report on slow specs.

## Install

Get it from npm.

```js
npm i jasmine-slow-reporter --save-dev
```

Add to jasmine

```js
var jasmineSlowReporter = require('jasmine-slow-reporter');
jasmineSlowReporter.threshold = 500; // It is 100ms by default.
jasmine.getEnv().addReporter(jasmineSlowReporter );
```

## Usage

Just continue testing like any other fun day at the office and when you make a slow spec you should see this after all the test have run.

```shell
Slow spec: "Spec full name"
Duration 500ms
```

## License

ISC

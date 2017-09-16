/* eslint-disable no-underscore-dangle */
const findSpecFile = require('./find-spec-file');

function itFactory(it) {
  return function jasmineSlowReporterIt(description, fn, timeout) {
    const spec = it(description, fn, timeout);
    spec.result._jasmineSlowReporter = findSpecFile();
    return spec;
  };
}

module.exports = itFactory;

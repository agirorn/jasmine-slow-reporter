var stackTrace = require('stack-trace');
var findSpecFile = require('./find-spec-file');

function itFactory(it) {
  return function jasmineSlowReporterIt(description, fn, timeout) {
    var spec = it(description, fn, timeout);
    spec.result._jasmineSlowReporter = findSpecFile(stackTrace.get());
    return spec;
  };
}

module.exports = itFactory;

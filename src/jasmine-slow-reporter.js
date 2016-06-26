var slowSpecs, start;
var itFactory = require('./it-factory');

// Overwrite jasmines it function to get filename and line number of each spec
// to properly report it for slow specs.
jasmine.getEnv().it = itFactory(jasmine.getEnv().it);

var jasmineSlowReporter = {
  threshold: 100,

  jasmineStarted: function() {
    slowSpecs = [];
  },

  specStarted: function() {
    start = now();
  },

  specDone: function(result) {
    var duration = now() - start;

    if (duration > jasmineSlowReporter.threshold) {
      slowSpecs.push({
        fullName: result.fullName,
        duration: duration,
        filename: result._jasmineSlowReporter.filename,
        line: result._jasmineSlowReporter.line,
        column: result._jasmineSlowReporter.column
      });
    }
  },

  jasmineDone: function() {
    slowSpecs.forEach(log);
  }
};

function now() {
  return (new Date()).getTime();
}

function log(spec) {
  console.log('');
  console.log('Slow spec: "' +spec.fullName+ '"');
  console.log(spec.filename+ ':' +spec.line);
  console.log('Duration: ' +spec.duration+ 'ms');
}

module.exports = jasmineSlowReporter;

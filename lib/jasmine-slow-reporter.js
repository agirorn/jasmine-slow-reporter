
var slowSpecs, start;

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
        duration: duration
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
  console.log('Duration: ' +spec.duration+ 'ms');
}

module.exports = jasmineSlowReporter;

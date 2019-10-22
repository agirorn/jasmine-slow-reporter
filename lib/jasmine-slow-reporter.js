/* global jasmine */
const itFactory = require('./it-factory');

let slowSpecs;
let start;

// Overwrite jasmines it function to get filename and line number of each spec
// to properly report it for slow specs.
jasmine.getEnv().it = itFactory(jasmine.getEnv().it);

function now() {
  return (new Date()).getTime();
}

function log(spec) {
  /* eslint-disable no-console */
  console.log('');
  console.log(`Slow spec: "${spec.fullName}"`);
  console.log(`${spec.filename}:${spec.line}`);
  console.log(`Duration: ${spec.duration}ms`);
  /* eslint-enable no-console */
}

const jasmineSlowReporter = {
  threshold: 100,

  jasmineStarted: () => {
    slowSpecs = [];
  },

  specStarted: () => {
    start = now();
  },

  specDone: (result) => {
    const duration = now() - start;

    if (duration > jasmineSlowReporter.threshold) {
      /* eslint-disable no-underscore-dangle */
      slowSpecs.push({
        fullName: result.fullName,
        duration,
        filename: result._jasmineSlowReporter.filename,
        line: result._jasmineSlowReporter.line,
        column: result._jasmineSlowReporter.column,
      });
      /* eslint-enable no-underscore-dangle */
    }
  },

  jasmineDone: () => {
    slowSpecs.forEach(log);
  },
};

module.exports = jasmineSlowReporter;

const first = require('underscore').first;
const filter = require('underscore').filter;
const parse = require('./stack-trace-parser');

function findSpecFile() {
  const trace = parse((new Error()).stack);
  return first(filter(trace, isSpec));
}

function isSpec(line) {
  return line.filename.match('.spec.js');
}

module.exports = findSpecFile;

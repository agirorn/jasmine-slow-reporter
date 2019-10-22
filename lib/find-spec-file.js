const { first } = require('underscore');
const { filter } = require('underscore');
const parse = require('./stack-trace-parser');

function isSpec(line) {
  return line.filename.match('.spec.js');
}

function findSpecFile() {
  const trace = parse((new Error()).stack);
  return first(filter(trace, isSpec));
}

module.exports = findSpecFile;

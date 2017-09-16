const first = require('underscore').first;
const filter = require('underscore').filter;
const map = require('underscore').map;

function findSpecFile(stackTrace) {
  const trace = map(stackTrace, filenameAndLineNumber);
  return first(filter(trace, isSpec));
}

function isSpec(line) {
  return line.filename.match('.spec.js');
}

function filenameAndLineNumber(line) {
  return {
    filename: line.getFileName(),
    line: Number(line.getLineNumber()),
  };
}

module.exports = findSpecFile;

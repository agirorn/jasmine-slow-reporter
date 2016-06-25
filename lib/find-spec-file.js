var first = require('underscore').first;
var filter = require('underscore').filter;
var map = require('underscore').map;

function findSpecFile(trace) {
  trace = map(trace, filenameAndLineNumber);
  return first(filter(trace, isSpec));
}

function isSpec(line) {
  return line.filename.match('.spec.js');
}

function filenameAndLineNumber(line) {
  return {
    filename: line.getFileName(),
    line: line.getLineNumber()
  };
}

module.exports = findSpecFile;

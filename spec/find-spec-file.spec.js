const findSpecFile = require('../lib/find-spec-file');
const stackTrace = require('stack-trace');

describe('jasmine-slow-reporter', () => {
  it('finds spec file in stack trace', () => {
    expect(findSpecFile(stackTrace.get())).toEqual({
      filename: __filename,
      line: 8,
    });
  });
});

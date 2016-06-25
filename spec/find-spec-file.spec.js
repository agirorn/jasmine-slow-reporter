describe('jasmine-slow-reporter', function() {
  var findSpecFile = require('../lib/find-spec-file');
  var stackTrace = require('stack-trace');

  it('finds spec file in stack trace', function() {
    expect(findSpecFile(stackTrace.get())).toEqual({
      filename: __filename,
      line: 6
    });
  });
});

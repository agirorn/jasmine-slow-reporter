const parser = require('../lib/stack-trace-parser');

describe('stack-trace-parser', () => {
  it('parser stack trace repl', () => {
    const stack = 'Error\n' +
      '    at repl:1:2\n' +
      '    at sigintHandlersWrap (vm.js:22:35)\n' +
      '    at sigintHandlersWrap (vm.js:73:12)\n' +
      '    at ContextifyScript.Script.runInThisContext (vm.js:21:12)\n' +
      '    at REPLServer.defaultEval (repl.js:340:29)\n';

    const result = [
      { filename: 'repl', line: 1 },
      { filename: 'vm.js', line: 22 },
      { filename: 'vm.js', line: 73 },
      { filename: 'vm.js', line: 21 },
      { filename: 'repl.js', line: 340 },
    ];

    expect(parser(stack)).toEqual(result);
  });

  it('parser stack trace file.js', () => {
    const stack = 'Error\n' +
      '    at Object.<anonymous> (/path/jasmine-slow-reporter/file.js:1:76)\n' +
      '    at Module._compile (module.js:570:32)\n' +
      '    at run (bootstrap_node.js:389:7)\n';

    const result = [
      { filename: '/path/jasmine-slow-reporter/file.js', line: 1 },
      { filename: 'module.js', line: 570 },
      { filename: 'bootstrap_node.js', line: 389 },
    ];

    expect(parser(stack)).toEqual(result);
  });
});

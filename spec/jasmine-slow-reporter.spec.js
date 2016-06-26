const jasmineSlowReporter = require('../lib/jasmine-slow-reporter');

describe('jasmine-slow-reporter', () => {
  let logged;
  let date;

  beforeEach(() => {
    date = spyOn(global, 'Date');
    grabConsoleLog();
  });

  describe('one slow running spec', () => {
    beforeEach(() => {
      jasmineSuite(() => {
        runSpec('spec full name', 0, 251,
                'spec/unit/first.spec.js', 498);
      });
    });

    it('is loged to the console', () => {
      expect(logged).toEqual([ // eslint-disable-line prefer-template
        '',
        'Slow spec: "spec full name"',
        'spec/unit/first.spec.js:498',
        'Duration: 251ms',
      ].join('\n') + '\n');
    });
  });

  describe('two slow running spec', () => {
    beforeEach(() => {
      jasmineSuite(() => {
        runSpec('spec one name', 0, 251,
                'spec/unit/first.spec.js', 300);
        runSpec('spec two name', 0, 251,
                'spec/unit/second.spec.js', 498);
      });
    });

    it('is loged to the console', () => {
      expect(logged).toEqual([ // eslint-disable-line prefer-template
        '',
        'Slow spec: "spec one name"',
        'spec/unit/first.spec.js:300',
        'Duration: 251ms',
        '',
        'Slow spec: "spec two name"',
        'spec/unit/second.spec.js:498',
        'Duration: 251ms',
      ].join('\n') + '\n');
    });
  });

  describe('lower threshold', () => {
    beforeEach(() => {
      jasmineSlowReporter.threshold = 200;
      jasmineSuite(() => {
        runSpec('spec one name', 0, 151,
                'spec/unit/first.spec.js', 300);
        runSpec('spec two name', 0, 251,
                'spec/unit/second.spec.js', 300);
      });
    });

    it('is loged to the console', () => {
      expect(logged).toEqual([ // eslint-disable-line prefer-template
        '',
        'Slow spec: "spec two name"',
        'spec/unit/second.spec.js:300',
        'Duration: 251ms',
      ].join('\n') + '\n');
    });
  });

  function dateWithTime(time) {
    return () => ({
      getTime: () => time,
    });
  }

  function grabConsoleLog() {
    logged = '';
    spyOn(console, 'log').and.callFake((message) => {
      logged = `${logged}${message}\n`;
    });
  }

  function jasmineSuite(callback) {
    jasmineSlowReporter.jasmineStarted();
    callback();
    jasmineSlowReporter.jasmineDone();
  }

  function runSpec(fullName, start, end, filename, line) {
    date.and.callFake(dateWithTime(start));
    jasmineSlowReporter.specStarted();
    date.and.callFake(dateWithTime(end));
    jasmineSlowReporter.specDone({
      fullName,
      _jasmineSlowReporter: {
        filename,
        line,
      },
    });
  }
});

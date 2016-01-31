describe('jasmine-slow-reporter', function() {
  var jasmineSlowReporter = require('../lib/jasmine-slow-reporter');
  var logged, date;

  beforeEach(function(){
    date = spyOn(global, 'Date');
    grabConsoleLog();
  });

  describe('one slow running spec', function() {
    beforeEach(function() {
      jasmineSuite(function() {
        runSpec('spec full name', 0, 251);
      });
    });

    it('is loged to the console', function() {
      expect(logged).toEqual([
        '',
        'Slow spec: "spec full name"',
        'Duration: 251ms'
      ].join('\n')+'\n');
    });
  });

  describe('two slow running spec', function() {
    beforeEach(function() {
      jasmineSuite(function() {
        runSpec('spec one name', 0, 251);
        runSpec('spec two name', 0, 251);
      });
    });

    it('is loged to the console', function() {
      expect(logged).toEqual([
        '',
        'Slow spec: "spec one name"',
        'Duration: 251ms',
        '',
        'Slow spec: "spec two name"',
        'Duration: 251ms'
      ].join('\n')+'\n');
    });
  });

  describe('lower threshold', function() {
    beforeEach(function() {
      jasmineSlowReporter.threshold = 200;
      jasmineSuite(function() {
        runSpec('spec one name', 0, 151);
        runSpec('spec two name', 0, 251);
      });
    });

    it('is loged to the console', function() {
      expect(logged).toEqual([
        '',
        'Slow spec: "spec two name"',
        'Duration: 251ms'
      ].join('\n')+'\n');
    });
  });

  function dateWithTime(time) {
    return function() {
      return {
        getTime: function() {
          return time;
        }
      };
    };
  }

  function grabConsoleLog() {
    logged = '';
    spyOn(console, 'log').and.callFake(function(message) {
      logged = logged + message + '\n';
    });
  }

  function jasmineSuite(callback) {
    jasmineSlowReporter.jasmineStarted();
    callback();
    jasmineSlowReporter.jasmineDone();
  }

  function runSpec(fullName, start, end) {
    date.and.callFake( dateWithTime(start) );
    jasmineSlowReporter.specStarted();
    date.and.callFake( dateWithTime(end) );
    jasmineSlowReporter.specDone({
      fullName: fullName
    });
  }

});

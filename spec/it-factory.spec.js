describe('itFactory', function() {
  var itFactory = require('../lib/it-factory');
  var result;

  beforeEach(function() {
    var newIt = itFactory(orginalIt);
    result = newIt().result;
  });

  describe('_jasmineSlowReporter', function() {
    it('should be defined', function() {
      expect(result._jasmineSlowReporter).toBeDefined();
    });

    it('should have currents spec filename', function() {
      expect(result._jasmineSlowReporter.filename).toBe(__filename);
    });

    it('should have the linumber from where it was called', function() {
      expect(result._jasmineSlowReporter.line).toBe(7);
    });
  });

  function orginalIt  () {
    return {
      result: {}
    };
  }
});

const itFactory = require('../lib/it-factory');

describe('itFactory', () => {
  let result;

  function orginalIt() {
    return {
      result: {},
    };
  }

  beforeEach(() => {
    const newIt = itFactory(orginalIt);
    result = newIt().result;
  });

  describe('_jasmineSlowReporter', () => {
    it('should be defined', () => {
      // eslint-disable-next-line no-underscore-dangle
      expect(result._jasmineSlowReporter).toBeDefined();
    });

    it('should have currents spec filename', () => {
      // eslint-disable-next-line no-underscore-dangle
      expect(result._jasmineSlowReporter.filename).toBe(__filename);
    });

    it('should have the linumber from where it was called', () => {
      // eslint-disable-next-line no-underscore-dangle
      expect(result._jasmineSlowReporter.line).toBe(14);
    });
  });
});

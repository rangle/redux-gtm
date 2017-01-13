const logger = require('../../src/extensions/logger');

describe('Extension: logger', () => {
  it('exposes a log method', () => {
    expect(typeof logger().log).toBe('function');
  });
});

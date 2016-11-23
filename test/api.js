const {
  createMiddleware,
  createMetaReducer,
  Extensions: {
    logger,
  },
  EventHelpers: {
    createGAevent,
    createGApageview,
  },
} = require('../src');

describe('API', () => {
  it('Exposes ReduxGTM correctly', () => {
    expect(createMiddleware).toBeDefined();
    expect(createMetaReducer).toBeDefined();
    // Extensions
    expect(logger).toBeDefined();
    // Event helpers
    expect(createGAevent).toBeDefined();
    expect(createGApageview).toBeDefined();
  });
});

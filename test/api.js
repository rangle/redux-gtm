const {
  createMiddleware,
  createMetaReducer,
  Extensions: {
    logger,
    offlineWeb,
    offlineReactNative,
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
    expect(offlineWeb).toBeDefined();
    expect(offlineReactNative).toBeDefined();
    // Event helpers
    expect(createGAevent).toBeDefined();
    expect(createGApageview).toBeDefined();
  });
});

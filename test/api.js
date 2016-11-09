const {
  createMiddleware,
  createMetaReducer,
  EventHelpers: {
    createGAevent,
    createGApageview,
  },
} = require('../src');

describe('API', () => {
  it('Exposes ReduxGTM correctly', () => {
    expect(createMiddleware).toBeDefined();
    expect(createMetaReducer).toBeDefined();
    // Event helpers
    expect(createGAevent).toBeDefined();
    expect(createGApageview).toBeDefined();
  });
});

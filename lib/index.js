const createMiddleware = require('./create-middleware');
const createMetaReducer = require('./create-meta-reducer');
// Event Helpers
const createGAevent = require('./create-ga-event');
const createGApageview = require('./create-ga-pageview');

module.exports = {
  createMiddleware,
  createMetaReducer,
  eventHelpers: {
    createGAevent,
    createGApageview,
  }
};

const createMiddleware = require('./create-middleware');
const createMetaReducer = require('./create-meta-reducer');
// Extensions
const logger = require('./extensions/logger');
// Event Helpers
const createGAevent = require('./event-helpers/create-ga-event');
const createGApageview = require('./event-helpers/create-ga-pageview');

module.exports = {
  createMiddleware,
  createMetaReducer,
  Extensions: {
    logger,
  },
  EventHelpers: {
    createGAevent,
    createGApageview,
  },
};

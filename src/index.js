const createMiddleware = require('./create-middleware');
const createMetaReducer = require('./create-meta-reducer');
// Extensions
const logger = require('./extensions/logger');
const offlineWeb = require('./extensions/offline-web');
const offlineReactNative = require('./extensions/offline-react-native');
// Event Helpers
const createGAevent = require('./event-helpers/create-ga-event');
const createGApageview = require('./event-helpers/create-ga-pageview');
const createGAuserTiming = require('./event-helpers/create-ga-user-timing');

module.exports = {
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
    createGAuserTiming,
  },
};

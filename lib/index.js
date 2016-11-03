const createMiddleware = require('./create-middleware');
const createMetaReducer = require('./create-meta-reducer');
const emitGAEvent = require('./emit-ga-event');
const emitGApageview = require('./emit-ga-pageview');

module.exports = {
  createMiddleware,
  createMetaReducer,
  emitGAEvent,
  emitGApageview,
};

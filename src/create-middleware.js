const createEvents = require('./create-events');
const registerEvents = require('./register-events');
const getDataLayer = require('./get-data-layer');

const createMiddleware = (eventDefinitionsMap, extensions = {}) => store => next => (action) => {
  if (!eventDefinitionsMap[action.type]) {
    return next(action);
  }

  const dataLayer = getDataLayer(window, extensions.customDataLayer);

  if (dataLayer === undefined) {
    return next(action);
  }

  const prevState = store.getState();

  const events = createEvents(eventDefinitionsMap[action.type], prevState, action);
  registerEvents(events, dataLayer, prevState, extensions, action);

  return next(action);
};

module.exports = createMiddleware;

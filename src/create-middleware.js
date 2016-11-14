const createEvents = require('./create-events');
const getDataLayer = require('./get-data-layer');

const createMiddleware = (eventDefinitionsMap, customDataLayer) => store => next => (action) => {
  const dataLayer = getDataLayer(window, customDataLayer);

  if (dataLayer === undefined || !eventDefinitionsMap[action.type]) {
    return next(action);
  }

  const prevState = store.getState();

  const events = createEvents(eventDefinitionsMap[action.type], prevState, action);
  events.filter(event => typeof event !== 'string').forEach(event => dataLayer.push(event));

  return next(action);
};

module.exports = createMiddleware;

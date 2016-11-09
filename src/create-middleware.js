const createEvent = require('./create-event');
const validateEvent = require('./validate-event');
const getDataLayer = require('./get-data-layer');

const createMiddleware = (actionsToTrack, customDataLayer) => store => next => (action) => {
  const dataLayer = getDataLayer(window, customDataLayer);

  const eventDefinition = actionsToTrack[action.type];

  if (dataLayer === undefined || !eventDefinition) {
    return next(action);
  }

  const prevState = store.getState();
  const event = createEvent(eventDefinition, prevState, action);

  const isValidEvent = validateEvent(event, eventDefinition);

  if (isValidEvent) {
    dataLayer.push(event);
  }

  return next(action);
};

module.exports = createMiddleware;

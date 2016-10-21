const createEvent = require('./create-event');
const validateEvent = require('./validate-event');
const getDataLayer = require('./get-data-layer');

const createMiddleware = (actionsToTrack, customDataLayer) => store => next => action => {
  const dataLayer = getDataLayer(window, customDataLayer);

  const result = next(action);

  const eventDefinition = actionsToTrack[action.type];

  if (dataLayer === undefined || !eventDefinition) {
    return result;
  }

  const state = store.getState();
  const event = createEvent(eventDefinition, state, action);

  const isValidEvent =  validateEvent(event, eventDefinition);

  if (isValidEvent) {
    dataLayer.push(event);
  }

  return result;
};

module.exports = createMiddleware;

const createEvent = require('./create-event');
const validateEvent = require('./validate-event');
const getDataLayer = require('./get-data-layer');

const createMetaReducer = (actionsToTrack, customDataLayer) => reducer => (state, action) => {
  const dataLayer = getDataLayer(window, customDataLayer);

  const result = reducer(state, action);

  const eventDefinition = actionsToTrack[action.type];
  if (dataLayer === undefined || !eventDefinition) {
    return result;
  }

  const event = createEvent(eventDefinition, state, action);
  const isValidEvent = validateEvent(event, eventDefinition);

  if (isValidEvent) {
    dataLayer.push(event);
  }

  return result;
};

module.exports = createMetaReducer;

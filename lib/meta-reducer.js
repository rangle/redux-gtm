const createEvent = require('./create-event');
const validateEvent = require('./validate-event');

const metaReducer = actionsToTrack => reducer => (state, action) => {
  const result = reducer(state, action);

  const eventDefinition = actionsToTrack[action.type];
  if (!eventDefinition) {
    return result;
  }

  window.dataLayer = window.dataLayer || [];

  const event = createEvent(eventDefinition, state, action);
  const isValidEvent = validateEvent(event, eventDefinition);

  if (isValidEvent) {
    window.dataLayer.push(event);
  }

  return result;
};

module.exports = metaReducer;

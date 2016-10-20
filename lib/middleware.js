const createEvent = require('./create-event');
const validateEvent = require('./validate-event');

const middleware = actionsToTrack => store => next => action => {
  const result = next(action);

  const eventDefinition = actionsToTrack[action.type];
  if (!eventDefinition) {
    return result;
  }

  window.dataLayer = window.dataLayer || [];

  const state = store.getState();
  const event = createEvent(eventDefinition, state, action);

  const isValidEvent =  validateEvent(event, eventDefinition);

  if (isValidEvent) {
    window.dataLayer.push(event);
  }

  return result;
};

module.exports = middleware;

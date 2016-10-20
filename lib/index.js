const createEvent = require('./create-event');
const validateEvent = require('./validate-event');

const reduxGTM = actionsToTrack => store => next => action => {

  const isActionToTrack = action.type in actionsToTrack;

  if (!isActionToTrack) {
    return next(action);
  }

  const result = next(action);

  window.dataLayer = window.dataLayer || [];

  const eventDefinition = actionsToTrack[action.type];
  const state = store.getState();
  const event = createEvent(eventDefinition, state, action);

  validateEvent(event, eventDefinition);

  window.dataLayer.push(event);

  return result;
};

module.exports = reduxGTM;

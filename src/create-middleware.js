const createEvent = require('./create-event');
const validateEvent = require('./validate-event');
const getDataLayer = require('./get-data-layer');

const createMiddleware = (eventDefinitionsMap, customDataLayer) => store => next => (action) => {
  const dataLayer = getDataLayer(window, customDataLayer);

  if (dataLayer === undefined || !eventDefinitionsMap[action.type]) {
    return next(action);
  }

  const prevState = store.getState();

  const pushEventToDataLayer = (eventDefinition) => {
    const event = createEvent(eventDefinition, prevState, action);
    const isValidEvent = validateEvent(event, eventDefinition);
    if (isValidEvent) {
      dataLayer.push(event);
    }
  };

  if (Array.isArray(eventDefinitionsMap[action.type])) {
    const eventDefinitions = eventDefinitionsMap[action.type];
    eventDefinitions.forEach(eventDefinition => pushEventToDataLayer(eventDefinition));
  } else {
    const eventDefinition = eventDefinitionsMap[action.type];
    pushEventToDataLayer(eventDefinition);
  }

  return next(action);
};

module.exports = createMiddleware;

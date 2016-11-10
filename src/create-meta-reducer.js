const createEvent = require('./create-event');
const validateEvent = require('./validate-event');
const getDataLayer = require('./get-data-layer');

const createMetaReducer = (eventDefinitionsMap, customDataLayer) => reducer => (state, action) => {
  const dataLayer = getDataLayer(window, customDataLayer);

  const result = reducer(state, action);

  if (dataLayer === undefined || !eventDefinitionsMap[action.type]) {
    return result;
  }

  const pushEventToDataLayer = (eventDefinition) => {
    const event = createEvent(eventDefinition, state, action);
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

  return result;
};

module.exports = createMetaReducer;

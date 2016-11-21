const createEvents = require('./create-events');
const getDataLayer = require('./get-data-layer');
const registerEvents = require('./register-events');

const createMetaReducer = (eventDefinitionsMap, options = {}) => reducer => (prevState, action) => {
  if (!eventDefinitionsMap[action.type]) {
    return reducer(prevState, action);
  }

  const dataLayer = getDataLayer(window, options.customDataLayer);

  if (dataLayer === undefined) {
    return reducer(prevState, action);
  }

  const events = createEvents(eventDefinitionsMap[action.type], prevState, action);
  registerEvents(events, dataLayer, prevState, options);

  return reducer(prevState, action);
};

module.exports = createMetaReducer;

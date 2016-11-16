const createEvents = require('./create-events');
const getDataLayer = require('./get-data-layer');

const createMetaReducer = (eventDefinitionsMap, options = {}) => reducer => (state, action) => {
  const dataLayer = getDataLayer(window, options.customDataLayer);

  const result = reducer(state, action);

  if (dataLayer === undefined || !eventDefinitionsMap[action.type]) {
    return result;
  }

  const events = createEvents(eventDefinitionsMap[action.type], state, action);
  events.filter(event => typeof event !== 'string').forEach(event => dataLayer.push(event));

  return result;
};

module.exports = createMetaReducer;

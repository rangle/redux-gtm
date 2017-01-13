const createEvents = require('./create-events');
const getDataLayer = require('./get-data-layer');
const registerEvents = require('./register-events');

function createMetaReducer(eventDefinitionsMap, extensions = {}) {
  return function (reducer) {
    return function (prevState, action) {
      if (!eventDefinitionsMap[action.type]) {
        return reducer(prevState, action);
      }

      const dataLayer = getDataLayer(window, extensions.customDataLayer);

      if (dataLayer === undefined) {
        return reducer(prevState, action);
      }

      const events = createEvents(eventDefinitionsMap[action.type], prevState, action);
      registerEvents(events, dataLayer, prevState, extensions, action);

      return reducer(prevState, action);
    };
  };
}

module.exports = createMetaReducer;

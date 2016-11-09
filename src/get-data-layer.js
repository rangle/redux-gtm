const { NO_WINDOW_WARNING } = require('./messages');

function getDataLayer(window, customDataLayer) {
  if (customDataLayer !== undefined && typeof customDataLayer.push === 'function') {
    return customDataLayer;
  }
  if (window !== undefined) {
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  }
  console.warn(NO_WINDOW_WARNING);
  return undefined;
}

module.exports = getDataLayer;

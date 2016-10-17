const reduxGTM = (options = {}) => store => next => action => {

  if (options.ignore !== undefined) {
    const isIgnoredAction = options.ignore(action);
    if (isIgnoredAction) {
      return next(action);
    }
  }

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: action.type,
    payload: action.payload,
  });

  const result = next(action);

  return result;
};

module.exports = reduxGTM;

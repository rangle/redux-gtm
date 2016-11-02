function emitGAEvent(eventProps = {}) {
  const defaultEvent = {
    event: 'REDUX_GTM_GA_EVENT',
    hitType: 'event',
    eventAction: 'unknown action',
    eventCategory: 'unknown category',
    eventLabel: 'unknown label',
    eventValue: 'unknown value',
  };
  return Object.assign(defaultEvent, eventProps);
}

module.exports = emitGAEvent;

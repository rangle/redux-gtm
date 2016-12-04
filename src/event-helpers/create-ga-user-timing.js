function createGAuserTiming(timeProps = {}) {
  const defaultEvent = {
    event: 'REDUX_GTM_GA_EVENT',
    hitType: 'timing',
    timingCategory: 'unknown category',
    timingLabel: 'unknown label',
    timingVar: 'unknown var',
    timingValue: 'unknown value',
  };
  return Object.assign(defaultEvent, timeProps);
}

module.exports = createGAuserTiming;

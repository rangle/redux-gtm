function registerEvents(events, dataLayer, state, options) {
  const {
    connectivitySelector,
    offlineStorage,
  } = options;

  const pushEventsToDataLayer = (eventsToPush) => {
    eventsToPush.forEach(eventToPush => dataLayer.push(eventToPush));
  };

  if (typeof connectivitySelector === 'function') {
    const isConnected = connectivitySelector(state);
    if (!isConnected) {
      offlineStorage.saveEvents(events);
    } else {
      pushEventsToDataLayer(events);
      offlineStorage.purgeEvents().then(pushEventsToDataLayer);
    }
  } else {
    pushEventsToDataLayer(events);
  }
}

module.exports = registerEvents;

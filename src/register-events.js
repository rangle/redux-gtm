function registerEvents(events, dataLayer, state, extensions, action) {
  const {
    logger,
    offlineStorage,
  } = extensions;

  const logEvents = (...args) => {
    if (logger !== undefined && typeof logger.log === 'function') {
      logger.log(...args);
    }
  };

  const pushEventsToDataLayer = (eventsToPush) => {
    eventsToPush.forEach(eventToPush => dataLayer.push(eventToPush));
    return eventsToPush;
  };

  if (offlineStorage !== undefined) {
    const isConnected = offlineStorage.isConnected(state);
    if (!isConnected) {
      offlineStorage.saveEvents(events)
                    .then((savedEvents) => {
                      logEvents(savedEvents, action, state, true, false);
                    });
    } else {
      pushEventsToDataLayer(events);
      logEvents(events, action, state);
      offlineStorage.purgeEvents()
                    .then(pushEventsToDataLayer)
                    .then((oldEvents) => {
                      logEvents(oldEvents, action, state, false, true);
                    });
    }
  } else {
    pushEventsToDataLayer(events);
    logEvents(events, action, state);
  }
}

module.exports = registerEvents;

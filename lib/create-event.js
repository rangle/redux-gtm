function createEvent(eventDefinition, state, action) {

  const event = { event: eventDefinition.eventName || action.type };

  if (typeof eventDefinition.generatePayload === 'function') {
    const payload = eventDefinition.generatePayload(state, action);
    return Object.assign({}, event, payload);
  }

  return event;
}

module.exports = createEvent;

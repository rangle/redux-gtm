function createEvent(eventDefinition, state, action) {

  const event = { event: eventDefinition.eventName || action.type };

  if (typeof eventDefinition.eventFields === 'function') {
    const payload = eventDefinition.eventFields(state, action);
    return Object.assign({}, event, payload);
  }

  return event;
}

module.exports = createEvent;

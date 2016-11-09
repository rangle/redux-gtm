function createEvent(eventDefinition, prevState, action) {
  const event = { event: eventDefinition.eventName || action.type };

  if (typeof eventDefinition.eventFields === 'function') {
    const payload = eventDefinition.eventFields(prevState, action);
    return Object.assign({}, event, payload);
  }

  return event;
}

module.exports = createEvent;

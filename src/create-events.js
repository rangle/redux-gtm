function createEvents(eventDefinitions, prevState, action) {
  const asArray = value => Array.isArray(value) ? value : [value];

  return asArray(eventDefinitions).map(({ eventName, eventFields, eventSchema }) => {
    const head = { event: eventName || action.type };
    const payload = typeof eventFields === 'function' ? eventFields(prevState, action) : {};

    const event = Object.assign(head, payload);

    if (eventSchema !== undefined) {
      const eventPropIsValid = key => eventSchema[key](event[key]);
      const isValid = Object.keys(eventSchema).every(eventPropIsValid);
      if (isValid) {
        return event;
      }
      return `Schema validation failure for ${event.event}`;
    }

    return event;
  });
}

module.exports = createEvents;

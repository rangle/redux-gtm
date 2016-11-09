function validateEvent(event, eventDefinition) {
  const hasSchema = eventDefinition.eventSchema !== undefined;

  if (!hasSchema) {
    return true;
  }

  const eventKeys = Object.keys(eventDefinition.eventSchema);
  const isValid = key => eventDefinition.eventSchema[key](event[key]);
  return eventKeys.every(isValid);
}

module.exports = validateEvent;

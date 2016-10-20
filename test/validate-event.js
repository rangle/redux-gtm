const validateEvent = require('../lib/validate-event');

describe('validateEvent(event, eventDefinition)', () => {
  it('Returns true if there is no event schema', () => {
    const event = { event: 'some-analytics-event' };
    const actual = validateEvent(event, {});
    const expected = true;
    expect(actual).toBe(expected);
  });

  it('Calls each validator in the event schema with the associated event value', () => {
    const event = { event: 'some-analytics-event', timeOnTask: 10000 };
    const eventDefinition = {
      eventSchema: {
        event: jest.fn(() => true),
        timeOnTask: jest.fn(() => true),
        userID: jest.fn(() => true),
        someInvalidKey: jest.fn(() => false),
        someValidKey: jest.fn(() => true),
      },
    };
    validateEvent(event, eventDefinition);
    expect(eventDefinition.eventSchema.event).toHaveBeenCalledWith('some-analytics-event');
    expect(eventDefinition.eventSchema.timeOnTask).toHaveBeenCalledWith(10000);
    expect(eventDefinition.eventSchema.userID).toHaveBeenCalledWith(undefined);
    expect(eventDefinition.eventSchema.someInvalidKey).toHaveBeenCalledWith(undefined);
    expect(eventDefinition.eventSchema.someValidKey).not.toHaveBeenCalled();
  });

  it('Returns false if any validator returns false', () => {
    const event = {};
    const eventDefinition = {
      eventSchema: {
        event: () => true,
        timeOnTask: () => false,
        userID: () => true,
      },
    };
    const actual = validateEvent(event, eventDefinition);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('Returns true if all validators return true', () => {
    const event = {};
    const eventDefinition = {
      eventSchema: {
        event: () => true,
        timeOnTask: () => true,
        userID: () => true,
      },
    };
    const actual = validateEvent(event, eventDefinition);
    const expected = true;
    expect(actual).toEqual(expected);
  });
});

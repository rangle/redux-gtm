const createGAevent = require('../lib/create-ga-event');

describe('createGAevent(eventProps)', () => {
  it('Creates an event with the proper keys', () => {
    const actual = Object.keys(createGAevent());
    const expected = [
      'event',
      'hitType',
      'eventAction',
      'eventCategory',
      'eventLabel',
      'eventValue',
    ];
    expect(actual).toEqual(expected);
  });

  it('Creates an event with the proper name', () => {
    const actual = createGAevent().event;
    const expected = 'REDUX_GTM_GA_EVENT';
    expect(actual).toEqual(expected);
  });

  it('Creates an event with the proper hitType', () => {
    const actual = createGAevent().hitType;
    const expected = 'event';
    expect(actual).toEqual(expected);
  });

  it('Attaches the provided properties to the event', () => {
    const eventProps = {
      eventAction: 'action',
      eventCategory: 'category',
      eventLabel: 'label',
      eventValue: 'value',
    };
    const actual = createGAevent(eventProps);
    expect(actual.eventAction).toBe('action');
    expect(actual.eventCategory).toBe('category');
    expect(actual.eventLabel).toBe('label');
    expect(actual.eventValue).toBe('value');
  });

  it('Assigns default values to the eventProps when not provided', () => {
    const actual = createGAevent();
    expect(actual.eventAction).toBe('unknown action');
    expect(actual.eventCategory).toBe('unknown category');
    expect(actual.eventLabel).toBe('unknown label');
    expect(actual.eventValue).toBe('unknown value');
  });
});

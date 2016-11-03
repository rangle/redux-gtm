const emitGAevent = require('../lib/emit-ga-event');

describe('emitGAevent(eventProps)', () => {
  it('Creates an event with the proper keys', () => {
    const actual = Object.keys(emitGAevent());
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
    const actual = emitGAevent().event;
    const expected = 'REDUX_GTM_GA_EVENT';
    expect(actual).toEqual(expected);
  });

  it('Creates an event with the proper hitType', () => {
    const actual = emitGAevent().hitType;
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
    const actual = emitGAevent(eventProps);
    expect(actual.eventAction).toBe('action');
    expect(actual.eventCategory).toBe('category');
    expect(actual.eventLabel).toBe('label');
    expect(actual.eventValue).toBe('value');
  });

  it('Assigns default values to the eventProps when not provided', () => {
    const actual = emitGAevent();
    expect(actual.eventAction).toBe('unknown action');
    expect(actual.eventCategory).toBe('unknown category');
    expect(actual.eventLabel).toBe('unknown label');
    expect(actual.eventValue).toBe('unknown value');
  });
});

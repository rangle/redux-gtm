const emitGAEvent = require('../lib/emit-ga-event');

describe('emitGAEvent(eventProps)',() => {
  it('Creates an event with the proper keys', () => {
    const actual = Object.keys(emitGAEvent());
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
    const actual = emitGAEvent().event;
    const expected = 'REDUX_GTM_GA_EVENT';
    expect(actual).toEqual(expected);
  });

  it('Creates an event with the proper hitType', () => {
    const actual = emitGAEvent().hitType;
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
    const actual = emitGAEvent(eventProps);
    expect(actual.eventAction).toBe('action');
    expect(actual.eventCategory).toBe('category');
    expect(actual.eventLabel).toBe('label');
    expect(actual.eventValue).toBe('value');
  });

  it('Assigns default values to the eventProps when not provided', () => {
    const actual = emitGAEvent();
    expect(actual.eventAction).toBe('unknown action');
    expect(actual.eventCategory).toBe('unknown category');
    expect(actual.eventLabel).toBe('unknown label');
    expect(actual.eventValue).toBe('unknown value');;
  });
});

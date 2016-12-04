const createGAuserTiming = require('../../src/event-helpers/create-ga-user-timing');

describe('createGAuserTiming(timeProps)', () => {
  it('Creates an timing with the proper keys', () => {
    const actual = Object.keys(createGAuserTiming());
    const expected = [
      'event',
      'hitType',
      'timingCategory',
      'timingLabel',
      'timingVar',
      'timingValue',
    ];
    expect(actual).toEqual(expected);
  });

  it('Creates an event with the proper name', () => {
    const actual = createGAuserTiming().event;
    const expected = 'REDUX_GTM_GA_EVENT';
    expect(actual).toEqual(expected);
  });

  it('Creates an event with the proper hitType', () => {
    const actual = createGAuserTiming().hitType;
    const expected = 'timing';
    expect(actual).toEqual(expected);
  });

  it('Attaches the provided properties to the event', () => {
    const eventProps = {
      timingCategory: 'category',
      timingLabel: 'label',
      timingVar: 'var',
      timingValue: 0,
    };
    const actual = createGAuserTiming(eventProps);
    expect(actual.timingCategory).toBe('category');
    expect(actual.timingLabel).toBe('label');
    expect(actual.timingVar).toBe('var');
    expect(actual.timingValue).toBe(0);
  });

  it('Assigns default values to the timingProps when not provided', () => {
    const actual = createGAuserTiming();
    expect(actual.timingCategory).toBe('unknown category');
    expect(actual.timingLabel).toBe('unknown label');
    expect(actual.timingVar).toBe('unknown var');
    expect(actual.timingValue).toBe('unknown value');
  });
});

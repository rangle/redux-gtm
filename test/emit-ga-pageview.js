const emitGApageview = require('../lib/emit-ga-pageview');

describe('emitGApageview(page)', () => {
  it('Creates an event with the proper keys', () => {
    const actual = Object.keys(emitGApageview());
    const expected = [
      'event',
      'hitType',
      'page',
    ];
    expect(actual).toEqual(expected);
  });

  it('Creates an event with the proper name', () => {
    const actual = emitGApageview().event;
    const expected = 'REDUX_GTM_GA_EVENT';
    expect(actual).toEqual(expected);
  });

  it('Creates an event with the proper hitType', () => {
    const actual = emitGApageview().hitType;
    const expected = 'pageview';
    expect(actual).toEqual(expected);
  });

  it('Creates an event with a page property when provided', () => {
    const actual = emitGApageview('/home').page;
    const expected = '/home';
    expect(actual).toBe(expected);
  });

  it('Assigns a default page when not provided', () => {
    const actual = emitGApageview().page;
    const expected = 'unknown page';
    expect(actual).toBe(expected);
  });
});

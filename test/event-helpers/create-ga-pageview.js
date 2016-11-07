const createGApageview = require('../../lib/event-helpers/create-ga-pageview');

describe('createGApageview(page)', () => {
  it('Creates an event with the proper keys', () => {
    const actual = Object.keys(createGApageview());
    const expected = [
      'event',
      'hitType',
      'page',
    ];
    expect(actual).toEqual(expected);
  });

  it('Creates an event with the proper name', () => {
    const actual = createGApageview().event;
    const expected = 'REDUX_GTM_GA_EVENT';
    expect(actual).toEqual(expected);
  });

  it('Creates an event with the proper hitType', () => {
    const actual = createGApageview().hitType;
    const expected = 'pageview';
    expect(actual).toEqual(expected);
  });

  it('Creates an event with a page property when provided', () => {
    const actual = createGApageview('/home').page;
    const expected = '/home';
    expect(actual).toBe(expected);
  });

  it('Assigns a default page when not provided', () => {
    const actual = createGApageview().page;
    const expected = 'unknown page';
    expect(actual).toBe(expected);
  });
});

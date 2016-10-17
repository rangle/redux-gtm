const reduxGTM = require('../lib');

describe('redux GTM middleware', () => {
  afterEach(() => window.dataLayer = undefined);

  it('pushes redux events to the dataLayer', () => {
    const action = { type: 'USER_INPUT', payload: 'username' };
    const dispatch = jest.fn();
    const getState = jest.fn();
    const next = jest.fn();

    expect(window.dataLayer).toBeUndefined();

    reduxGTM()({ dispatch, getState })(next)(action);

    expect(window.dataLayer).toEqual([
      { event: 'USER_INPUT', payload: 'username' },
    ]);
  });

  it('has an option to omit actions from being pushed to the dataLayer', () => {
    const ACTIONS_TO_OMIT = [
      { type: 'redux-form/BLUR' },
      { type: 'redux-form/CHANGE' },
      { type: 'redux-form/TOUCH' },
    ];
    const isIgnoredAction = (action) =>
      ACTIONS_TO_OMIT.some(actionToOmit => actionToOmit.type === action.type);

    const actions = [
      { type: 'redux-form/BLUR' },
      { type: 'redux-form/CHANGE' },
      { type: 'USER_INPUT', payload: 'username' },
      { type: 'redux-form/TOUCH' },
    ];

    const dispatch = jest.fn();
    const getState = jest.fn();
    const next = jest.fn();

    expect(window.dataLayer).toBeUndefined();

    const options = { ignore: isIgnoredAction };

    actions.forEach(action => reduxGTM(options)({ dispatch, getState })(next)(action));

    expect(window.dataLayer).toEqual([
      { event: 'USER_INPUT', payload: 'username' },
    ]);
  });
});

const { createStore, applyMiddleware } = require('redux');
const reduxGTM = require('../lib');

describe('Redux GTM middleware', () => {
  const initialState = {
    formFillStartTime: 1,
  };

  const reducer = (state = initialState, action) => {
    if (action.type === 'FORM_FILL_ENDED') {
      return Object.assign({}, state, { formFillEndTime: 10 });
    }
    return state;
  };

  it('Maps specified actions to events', () => {
    const actionsToTrack = {
      'FORM_FILL_ENDED': {
        eventName: 'user-form-input',
        generatePayload(state, action) {
          const startTime = state.formFillStartTime;
          const endTime = state.formFillEndTime;
          const formName = action.formName;
          return {
            timeOnTask: endTime - startTime,
            form: formName,
          };
        },
      },
    };

    // create a Redux store with the reduxGTM middleware
    const analytics = reduxGTM(actionsToTrack);
    const store = createStore(reducer, applyMiddleware(analytics));

    expect(window.dataLayer).toBeUndefined();

    // dispatch an untracked action
    store.dispatch({ type: 'SOME_UNTRACKED_ACTION' });

    // It only tracks events defined in actionsToTrack
    expect(window.dataLayer).toBeUndefined();

    // dispatch a tracked action
    store.dispatch({ type: 'FORM_FILL_ENDED', formName: 'sign-up' });

    expect(window.dataLayer).toEqual([
      {
        event: 'user-form-input',
        timeOnTask: 9,
        form: 'sign-up',
      },
    ]);

    window.dataLayer = undefined;
  });
});

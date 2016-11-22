const { createStore, applyMiddleware } = require('redux');
const createMiddleware = require('../src/create-middleware');

describe('createMiddleware(eventDefinitionsMap, [extensions])', () => {
  beforeEach(() => {
    // The middleware has one side affect: to update the data layer.
    window.dataLayer = undefined;
  });

  describe('When an action with an event definition is dispatched', () => {
    it('creates the events and pushes them to the data layer', () => {
      const initialState = {
        formFillStartTime: 1,
      };
      const reducer = (state = initialState, action) => {
        if (action.type === 'FORM_FILL_ENDED') {
          return Object.assign({}, state, { formFillStartTime: 0 });
        }
        return state;
      };
      const eventDefinitionsMap = {
        FORM_FILL_ENDED: {
          eventName: 'user-form-input',
          eventFields(prevState, action) {
            const startTime = prevState.formFillStartTime;
            const endTime = action.time;
            const formName = action.formName;
            return {
              timeOnTask: endTime - startTime,
              form: formName,
            };
          },
        },
      };
      const gtmMiddleware = createMiddleware(eventDefinitionsMap);
      const store = createStore(reducer, applyMiddleware(gtmMiddleware));

      store.dispatch({ type: 'FORM_FILL_ENDED', formName: 'sign-up', time: 10 });
      expect(window.dataLayer).toEqual([
        {
          event: 'user-form-input',
          timeOnTask: 9,
          form: 'sign-up',
        },
      ]);
    });
  });

  describe('When an action does not have an associated event definition', () => {
    const gtmMiddleware = createMiddleware({});
    const reducer = state => state;

    it('does not push any events to the data layer', () => {
      const store = createStore(reducer, applyMiddleware(gtmMiddleware));
      window.dataLayer = [{ event: 'some-event' }];
      store.dispatch({ type: 'SOME_REDUX_ACTION' });

      const expected = [{ event: 'some-event' }]; // no change
      const actual = window.dataLayer;
      expect(actual).toEqual(expected);
    });
  });
});

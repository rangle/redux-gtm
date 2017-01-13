const { createStore } = require('redux');
const createMetaReducer = require('../src/create-meta-reducer');

describe('createMetaReducer(eventDefinitionsMap, [options])', () => {
  beforeEach(() => {
    // The middleware has one side affect: to update the data layer.
    window.dataLayer = undefined;
  });

  describe('When a valid event definitions map is provided ', () => {
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
      const gtmMetaReducer = createMetaReducer(eventDefinitionsMap);
      const store = createStore(gtmMetaReducer(reducer));

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
    const gtmMetaReducer = createMetaReducer({});
    const reducer = state => state;

    it('does not push any events to the data layer', () => {
      const store = createStore(gtmMetaReducer(reducer));
      window.dataLayer = [{ event: 'some-event' }];
      store.dispatch({ type: 'SOME_REDUX_ACTION' });

      const expected = [{ event: 'some-event' }]; // no change
      const actual = window.dataLayer;
      expect(actual).toEqual(expected);
    });
  });
});

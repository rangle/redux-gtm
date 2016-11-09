const { createStore, applyMiddleware } = require('redux');
const createMiddleware = require('../src/create-middleware');

describe('Redux GTM middleware', () => {
  const initialState = {
    formFillStartTime: 1,
  };

  const reducer = (state = initialState, action) => {
    if (action.type === 'FORM_FILL_ENDED') {
      return Object.assign({}, state, { formFillStartTime: 0 });
    }
    return state;
  };

  describe('createMiddleware(eventDefinitionsMap)', () => {
    it('Pushes analytics events to window.dataLayer', () => {
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
        LOCATION_CHANGED: {
          eventName: 'page-view',
          eventFields() {
            return {};
          },
          eventSchema: {
            event: () => true,
            route: () => false,
          },
        },
      };

      // create a Redux store with the reduxGTM middleware
      const analyticsMiddleware = createMiddleware(eventDefinitionsMap);
      const store = createStore(reducer, applyMiddleware(analyticsMiddleware));

      expect(window.dataLayer).toBeUndefined();

      // dispatch an untracked action
      store.dispatch({ type: 'SOME_UNTRACKED_ACTION' });

      // It only tracks events defined in eventDefinitionsMap
      expect(window.dataLayer).toEqual([]);

      // dispatch a tracked action
      store.dispatch({ type: 'FORM_FILL_ENDED', formName: 'sign-up', time: 10 });

      expect(window.dataLayer).toEqual([
        {
          event: 'user-form-input',
          timeOnTask: 9,
          form: 'sign-up',
        },
      ]);

      // dispatch an action with an invalid event shape (based on eventSchema)
      store.dispatch({ type: 'LOCATION_CHANGED' });

      // the event should not be pushed to the data layer
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

  describe('createMiddlware(eventDefinitionsMap, customDataLayer', () => {
    it('Pushes analytics events to the customDataLayer', () => {
      const eventDefinitionsMap = {
        FORM_FILL_ENDED: {
          eventName: 'user-form-input',
        },
      };

      const customDataLayer = {
        push: jest.fn(),
      };
      const analyticsMiddleware = createMiddleware(eventDefinitionsMap, customDataLayer);
      const store = createStore(reducer, applyMiddleware(analyticsMiddleware));

      store.dispatch({ type: 'FORM_FILL_ENDED' });

      const expected = {
        event: 'user-form-input',
      };

      expect(customDataLayer.push).toHaveBeenCalledWith(expected);
    });
  });
});

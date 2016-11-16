const { createStore } = require('redux');
const createMetaReducer = require('../src/create-meta-reducer');

describe('Meta reducer', () => {
  beforeEach(() => {
    // The middleware has one side affect: to update the data layer.
    window.dataLayer = undefined;
  });

  describe('When a window.dataLayer variable does not exist', () => {
    it('creates a window.dataLayer variable and sets it to an empty array', () => {
      const reducer = state => state;
      const eventDefinitionsMap = {};
      const gtmMetaReducer = createMetaReducer(eventDefinitionsMap);

      expect(window.dataLayer).toBeUndefined();
      createStore(gtmMetaReducer(reducer));
      expect(window.dataLayer).toBeDefined();
      expect(window.dataLayer).toEqual([]);
    });
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

  describe("When an event does not match it's schema", () => {
    it('does not push the event to the data layer', () => {
      const reducer = (state = {}) => state;
      const eventDefinitionsMap = {
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
      const gtmMetaReducer = createMetaReducer(eventDefinitionsMap);
      const store = createStore(gtmMetaReducer(reducer));

      store.dispatch({ type: 'LOCATION_CHANGED' });
      expect(window.dataLayer).toEqual([]);
    });
  });

  describe('When a custom data layer is provided', () => {
    it('pushes events to the custom data layer', () => {
      const eventDefinitionsMap = {
        FORM_FILL_ENDED: { eventName: 'user-form-input' },
      };
      const customDataLayer = { push: jest.fn() };
      const gtmMetaReducer = createMetaReducer(eventDefinitionsMap, { customDataLayer });
      const reducer = state => state;
      const store = createStore(gtmMetaReducer(reducer));

      const expected = { event: 'user-form-input' };
      store.dispatch({ type: 'FORM_FILL_ENDED' });
      expect(customDataLayer.push).toHaveBeenCalledWith(expected);
    });
  });

  describe('When an array of event definitions is provided for a given action', () => {
    it('creates an event for each definition and pushes it to the data layer', () => {
      const eventDefinitionsMap = {
        SOME_REDUX_ACTION: [
          { eventName: 'event1' },
          { eventName: 'event2' },
          { eventName: 'event3' },
        ],
      };
      const gtmMetaReducer = createMetaReducer(eventDefinitionsMap);
      const reducer = state => state;
      const store = createStore(gtmMetaReducer(reducer));

      const expected = [
        { event: 'event1' },
        { event: 'event2' },
        { event: 'event3' },
      ];
      store.dispatch({ type: 'SOME_REDUX_ACTION' });
      const actual = window.dataLayer;
      expect(actual).toEqual(expected);
    });
  });
});

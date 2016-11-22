const { createStore, applyMiddleware } = require('redux');
const createMiddleware = require('../src/create-middleware');

describe('createMiddleware(eventDefinitionsMap, [extensions])', () => {
  beforeEach(() => {
    // The middleware has one side affect: to update the data layer.
    window.dataLayer = undefined;
  });

  describe('When a window.dataLayer variable does not exist', () => {
    it('creates a window.dataLayer variable and sets it to an empty array', () => {
      const reducer = state => state;
      const eventDefinitionsMap = { SOME_ACTION: {} };
      const gtmMiddleware = createMiddleware(eventDefinitionsMap);
      const store = createStore(reducer, applyMiddleware(gtmMiddleware));

      expect(window.dataLayer).toBeUndefined();
      store.dispatch({ type: 'SOME_ACTION' });
      expect(window.dataLayer).toBeDefined();
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
      const gtmMiddleware = createMiddleware(eventDefinitionsMap);
      const store = createStore(reducer, applyMiddleware(gtmMiddleware));

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
      const gtmMiddleware = createMiddleware(eventDefinitionsMap, { customDataLayer });
      const reducer = state => state;
      const store = createStore(reducer, applyMiddleware(gtmMiddleware));

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
      const gtmMiddleware = createMiddleware(eventDefinitionsMap);
      const reducer = state => state;
      const store = createStore(reducer, applyMiddleware(gtmMiddleware));

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

  describe('When an action does not have an associated event definition', () => {
    const gtmMiddleware = createMiddleware({});
    const reducer = state => state;

    it('does not create a new data layer', () => {
      const store = createStore(reducer, applyMiddleware(gtmMiddleware));
      store.dispatch({ type: 'SOME_REDUX_ACTION' });

      const actual = window.dataLayer;
      expect(actual).toBeUndefined();
    });
    it('does not mutate an existing data layer', () => {
      const store = createStore(reducer, applyMiddleware(gtmMiddleware));
      window.dataLayer = [{ event: 'some-event' }];
      store.dispatch({ type: 'SOME_REDUX_ACTION' });

      const expected = [{ event: 'some-event' }]; // no change
      const actual = window.dataLayer;
      expect(actual).toEqual(expected);
    });
  });

  describe('When an offlineStorage extension is provided and the app is offline', () => {
    const extensions = {
      offlineStorage: {
        saveEvents: jest.fn(),
        isConnected: () => false,
      },
    };
    const reducer = state => state;
    const eventDefinitionsMap = { SOME_ACTION: {} };
    const gtmMiddleware = createMiddleware(eventDefinitionsMap, extensions);

    it('saves events to the provided offlineStorage option', () => {
      const store = createStore(reducer, applyMiddleware(gtmMiddleware));
      store.dispatch({ type: 'SOME_ACTION' });

      expect(extensions.offlineStorage.saveEvents).toHaveBeenCalledWith([{ event: 'SOME_ACTION' }]);
    });

    it('does not push events to the data layer', () => {
      const store = createStore(reducer, applyMiddleware(gtmMiddleware));
      store.dispatch({ type: 'SOME_ACTION' });

      const expected = [];
      const actual = window.dataLayer;
      expect(actual).toEqual(expected);
    });
  });

  describe('When an offlineStorage extension is provided and the app is offline', () => {
    it('purges events from offlineStorage', () => {
      const extensions = {
        offlineStorage: {
          purgeEvents: jest.fn(() => Promise.resolve([])),
          isConnected: () => true,
        },
      };
      const reducer = state => state;
      const eventDefinitionsMap = { SOME_ACTION: {} };
      const gtmMiddleware = createMiddleware(eventDefinitionsMap, extensions);
      const store = createStore(reducer, applyMiddleware(gtmMiddleware));

      store.dispatch({ type: 'SOME_ACTION' });
      expect(extensions.offlineStorage.purgeEvents).toHaveBeenCalled();
    });

    it('saves any events from offlineStorage to the data layer', () => {
      // This isn't the greatest integration test for createMiddleware.
      // The issue is that offline events are pushed to the data layer
      // asynchronously. So I ended up attaching the assertion to the
      // window.dataLayer.push stub. It's gross, I know.
      const expected = { event: 'some-old-event' };
      window.dataLayer = {
        push: (event) => {
          if (event.event !== 'SOME_ACTION') {
            expect(event).toEqual(expected);
          }
        },
      };
      const extensions = {
        offlineStorage: {
          purgeEvents: () => Promise.resolve([{ event: 'some-old-event' }]),
          isConnected: () => true,
        },
      };
      const reducer = state => state;
      const eventDefinitionsMap = { SOME_ACTION: {} };
      const gtmMiddleware = createMiddleware(eventDefinitionsMap, extensions);
      const store = createStore(reducer, applyMiddleware(gtmMiddleware));

      store.dispatch({ type: 'SOME_ACTION' });
    });
  });
});

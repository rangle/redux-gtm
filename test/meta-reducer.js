const { createStore, applyMiddleware } = require('redux');
const createMetaReducer = require('../src/create-meta-reducer');

describe('Redux GTM meta reducer', () => {
  beforeEach(() => {
    // The middleware has one side affect: to update the data layer.
    window.dataLayer = undefined;
  });

  it('Creates a global dataLayer variable if it doesnt exist already', () => {
    const reducer = state => state;
    const eventDefinitionsMap = {};
    const gtmMetaReducer = createMetaReducer(eventDefinitionsMap);

    expect(window.dataLayer).toBeUndefined();
    const store = createStore(gtmMetaReducer(reducer));
    expect(window.dataLayer).toBeDefined();
    expect(window.dataLayer).toEqual([]);
  });

  it('Pushes analytics events to the dataLayer', () => {
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

  it('Does not push events that dont match the eventSchema', () => {
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

  it('Pushes events to a custom data layer if provided', () => {
    const eventDefinitionsMap = {
      FORM_FILL_ENDED: { eventName: 'user-form-input' },
    };
    const customDataLayer = { push: jest.fn() };
    const gtmMetaReducer = createMetaReducer(eventDefinitionsMap, customDataLayer);
    const reducer = state => state;
    const store = createStore(gtmMetaReducer(reducer));

    const expected = { event: 'user-form-input' };
    store.dispatch({ type: 'FORM_FILL_ENDED' });
    expect(customDataLayer.push).toHaveBeenCalledWith(expected);
  });

  it('Can accept an array of event definitions', () => {
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

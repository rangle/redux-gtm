const registerEvents = require('../src/register-events');

describe('registerEvents(events, dataLayer, state, options)', () => {
  describe('When a connectivity selector is not provided', () => {
    const events = [{ event: 'some-event' }];
    const dataLayer = { push: jest.fn() };
    const state = {};
    const options = {};

    it('pushes events to the data layer', () => {
      registerEvents(events, dataLayer, state, options);
      expect(dataLayer.push).toHaveBeenCalledWith({ event: 'some-event' });
    });
  });

  describe('When a connectivity selector is provided, and the app is offline', () => {
    const events = [{ event: 'some-event' }, { event: 'some-other-event' }];
    const dataLayer = { push: jest.fn() };
    const options = {
      connectivitySelector: state => state.isConnected,
      offlineStorage: { saveEvents: jest.fn() },
    };
    const state = { isConnected: false };

    registerEvents(events, dataLayer, state, options);

    it('pushes events to offline storage', () => {
      expect(options.offlineStorage.saveEvents).toHaveBeenCalledWith(events);
    });
    it('does not push events to the data layer', () => {
      expect(dataLayer.push).not.toHaveBeenCalled();
    });
  });

  describe('When a connectivity selector is provided, and the app is online', () => {
    it('purges events from offline storage', () => {
      const events = [];
      const dataLayer = { push: () => {} };
      const options = {
        connectivitySelector: state => state.isConnected,
        offlineStorage: { purgeEvents: jest.fn(() => Promise.resolve()) },
      };
      const state = { isConnected: true };

      registerEvents(events, dataLayer, state, options);
      expect(options.offlineStorage.purgeEvents).toHaveBeenCalled();
    });
    it('pushes the new events to the data layer, synchronously', () => {
      const events = [{ event: 'some-event' }];
      const dataLayer = { push: jest.fn() };
      const options = {
        connectivitySelector: state => state.isConnected,
        offlineStorage: { purgeEvents: () => Promise.resolve() },
      };
      const state = { isConnected: true };

      registerEvents(events, dataLayer, state, options);
      expect(dataLayer.push).toHaveBeenCalledWith({ event: 'some-event' });
    });
    it('purges events from offline storage and pushes them to the data layer', () => {
      const events = [];
      const oldEvents = [{ event: 'some-event' }];
      const options = {
        connectivitySelector: state => state.isConnected,
        offlineStorage: {
          purgeEvents: () => Promise.resolve(oldEvents),
        },
      };
      const state = { isConnected: true };

      // dataLayer.push will first be called with the new events.
      // It should be called a second time with the events that were
      // purged from offline storage.
      let numTimesCalled = 0;
      const dataLayer = {
        push() {
          numTimesCalled += 1;
          if (numTimesCalled === 2) {
            expect(events).toEqual({ event: 'some-event' });
          }
        },
      };
      registerEvents(events, dataLayer, state, options);
    });
  });
});

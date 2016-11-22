const registerEvents = require('../src/register-events');

describe('registerEvents(events, dataLayer, state, extensions, action)', () => {
  describe('When given an array of events, and a data layer', () => {
    const events = [{ event: 'some-event' }];
    const dataLayer = { push: jest.fn() };
    const state = {};
    const extensions = {};

    it('pushes events to the data layer', () => {
      registerEvents(events, dataLayer, state, extensions);
      expect(dataLayer.push).toHaveBeenCalledWith({ event: 'some-event' });
    });
  });

  describe('When provided with an offline storage extension', () => {
    describe('When the app is offline', () => {
      const state = { isConnected: false };
      const dataLayer = { push: jest.fn() };
      const events = [{ event: 'some-event' }, { event: 'some-other-event' }];
      const extensions = {
        offlineStorage: {
          saveEvents: jest.fn(() => Promise.resolve()),
          isConnected: state => state.isConnected,
        },
      };
      registerEvents(events, dataLayer, state, extensions);

      it('pushes events to offline storage', () => {
        expect(extensions.offlineStorage.saveEvents).toHaveBeenCalledWith(events);
      });

      it('does not push events to the data layer', () => {
        expect(dataLayer.push).not.toHaveBeenCalled();
      });
    });

    describe('When the app is online', () => {
      it('purges events from offline storage', () => {
        const events = [];
        const dataLayer = { push: () => {} };
        const extensions = {
          offlineStorage: {
            purgeEvents: jest.fn(() => Promise.resolve([])),
            isConnected: state => state.isConnected,
          },
        };
        const state = { isConnected: true };

        registerEvents(events, dataLayer, state, extensions);
        expect(extensions.offlineStorage.purgeEvents).toHaveBeenCalled();
      });

      it('pushes the new events to the data layer', () => {
        const events = [{ event: 'some-event' }];
        const dataLayer = { push: jest.fn() };
        const extensions = {
          purgeEvents: () => Promise.resolve([]),
          isConnected: state => state.isConnected,
        };
        const state = { isConnected: true };

        registerEvents(events, dataLayer, state, extensions);
        expect(dataLayer.push).toHaveBeenCalledWith({ event: 'some-event' });
      });

      it('purges events from offline storage and pushes them to the data layer', () => {
        const events = [];
        const extensions = {
          offlineStorage: {
            purgeEvents: () => Promise.resolve([{ event: 'some-event' }]),
            isConnected: state => state.isConnected,
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
        registerEvents(events, dataLayer, state, extensions);
      });
    });
  });

  describe('When a logger extension is provided', () => {
    it('calls logger.log', () => {
      const extensions = {
        logger: { log: jest.fn() },
      };
      const events = [{ event: 'some-event' }];
      const action = { type: 'SOME_ACTION' };
      const state = {};
      const dataLayer = { push(){} };
      registerEvents(events, dataLayer, state, extensions, action);

      expect(extensions.logger.log).toHaveBeenCalledWith(events, action, state);
    });
    describe('When an offline storage extension is provided', () => {
      describe('When the app is offline', () => {
        it('saves the events then passes them to logger.log', () => {});
      });
      describe('When the app is online', () => {
        it('calls logger.log on the new events', () => {
          const extensions = {
            offlineStorage: {
              purgeEvents: () => Promise.resolve([]),
              isConnected: state => state.isConnected,
            },
            logger: { log: jest.fn() },
          };
          const state = { isConnected: true };
          const dataLayer = { push() {} };
          const events = [{ event: 'some-event' }];
          const action = { type: 'SOME_ACTION' };
          registerEvents(events, dataLayer, state, extensions, action);

          expect(extensions.logger.log).toHaveBeenCalledWith(events, action, state);
        });
        it('purges the offline storage and passes those events to logger.log', () => {});
      });
    });
  });
});

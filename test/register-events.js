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

  describe('When given an offline storage extension', () => {
    describe('If the app is offline', () => {
      const dataLayer = { push: jest.fn() };
      const events = [{ event: 'some-event' }, { event: 'some-other-event' }];
      const extensions = {
        offlineStorage: {
          saveEvents: jest.fn(() => ({ then: callback => callback(events) })),
          isConnected: state => state.isConnected,
        },
      };
      const state = { isConnected: false };
      registerEvents(events, dataLayer, state, extensions);

      it('pushes events to offline storage', () => {
        expect(extensions.offlineStorage.saveEvents).toHaveBeenCalledWith(events);
      });
    });

    describe('If the app is online', () => {
      it('pushes the new events to the data layer', () => {
        const events = [{ event: 'some-event' }];
        const dataLayer = { push: jest.fn() };
        const extensions = {
          offlineStorage: {
            purgeEvents: () => Promise.resolve([]),
            isConnected: state => state.isConnected,
          },
        };
        const state = { isConnected: true };

        registerEvents(events, dataLayer, state, extensions);
        expect(dataLayer.push).toHaveBeenCalledWith({ event: 'some-event' });
      });

      it('purges old events from offline storage', () => {
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

      describe('If there are events that were stored offline', () => {
        const events = [{ event: 'some-event' }];
        const oldEvents = [{ event: 'some-old-event' }];
        const extensions = {
          offlineStorage: {
            purgeEvents: () => ({
              then(callback) {
                callback(oldEvents);
                return { then() {} };
              },
            }),
            isConnected: () => true,
          },
        };
        const dataLayer = { push: jest.fn() };
        const state = {};
        it('pushes them to the data layer', () => {
          registerEvents(events, dataLayer, state, extensions);
          expect(dataLayer.push).toHaveBeenCalledWith({ event: 'some-old-event' });
        });
      });

      describe('If there are no events that were stored offline', () => {
        const events = [{ event: 'some-event' }];
        const oldEvents = null;
        const extensions = {
          offlineStorage: {
            purgeEvents: () => ({
              then(callback) {
                callback(oldEvents);
              },
            }),
            isConnected: () => true,
          },
        };
        const dataLayer = { push() {} };
        const state = {};
        it('does not throw an error', () => {
          registerEvents(events, dataLayer, state, extensions);
        });
      });
    });
  });

  describe('When given a logger extension', () => {
    it('calls logger.log when registering events', () => {
      const extensions = {
        logger: { log: jest.fn() },
      };
      const events = [{ event: 'some-event' }];
      const action = { type: 'SOME_ACTION' };
      const state = {};
      const dataLayer = { push() {} };
      registerEvents(events, dataLayer, state, extensions, action);

      expect(extensions.logger.log).toHaveBeenCalledWith(events, action, state);
    });

    describe('If an offline storage extension is also provided', () => {
      describe('and the app is offline', () => {
        const events = [{ event: 'some-event' }];
        const extensions = {
          logger: { log: jest.fn() },
          offlineStorage: {
            saveEvents: eventsToSave => ({
              then(callback) {
                callback(eventsToSave);
              },
            }),
            isConnected: () => false,
          },
        };
        const action = {};
        const state = {};
        const dataLayer = { push() {} };
        it('passes the saved events to logger.log', () => {
          registerEvents(events, dataLayer, state, extensions, action);
          expect(extensions.logger.log).toHaveBeenCalledWith(events, action, state, true, false);
        });
      });

      describe('and the app is online', () => {
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
        it('passes any events that were in offline storage to logger.log', () => {
          const oldEvents = [{ event: 'some-old-event' }];
          const extensions = {
            logger: { log: jest.fn() },
            offlineStorage: {
              purgeEvents: () => ({
                then(callback) {
                  callback(oldEvents);
                },
              }),
              isConnected: () => true,
            },
          };
          const state = {};
          const dataLayer = { push() {} };
          const events = [];
          const action = {};
          registerEvents(events, dataLayer, state, extensions, action);
          expect(extensions.logger.log)
            .toHaveBeenLastCalledWith(oldEvents, null, null, false, true);
        });
      });
    });
  });
});

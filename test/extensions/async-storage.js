const asyncStorage = require('../../src/extensions/offline-storage/async-storage');

describe('asyncStorage(AsyncStorage, isConnected)', () => {
  describe('When called with valid inputs', () => {
    it('returns a valid offline storage abstraction/API', () => {
      const AsyncStorage = {};
      const isConnected = () => {};
      const offlineStorage = asyncStorage(AsyncStorage, isConnected);
      expect(typeof offlineStorage.saveEvents).toBe('function');
      expect(typeof offlineStorage.purgeEvents).toBe('function');
      expect(offlineStorage.isConnected).toEqual(isConnected);
    });
  });

  describe('When you call saveEvents with some events', () => {
    it('saves those events to the offline store', () => {
      const AsyncStorage = {
        setItem: jest.fn(),
      };
      const isConnected = () => {};
      const offlineStorage = asyncStorage(AsyncStorage, isConnected);

      const events = [{ event: 'some-event' }];
      offlineStorage.saveEvents(events);
      expect(AsyncStorage.setItem)
        .toHaveBeenCalledWith('EventsStore', '[{"event":"some-event"}]');
    });

    describe('When there are existing events in the offline store', () => {
      it('appends the existing and new events to the offline store', () => {
        const AsyncStorage = {
          setItem: jest.fn(),
          getItem: () => Promise.resolve('[{"event":"some-old-event"}]'),
        };
        const isConnected = () => {};
        const offlineStorage = asyncStorage(AsyncStorage, isConnected);

        const events = [{ event: 'some-event' }];
        offlineStorage.saveEvents(events);

        expect(AsyncStorage.setItem)
          .toHaveBeenCalledWith('EventsStore', '[{"event":"some-event"}]');
      });
    });
  });

  describe('When you call purgeEvents', () => {
    it('returns all events from the offline store', () => {
    });
    it('clears all events from the offline store', () => {
    });
  });
});

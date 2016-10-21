const getDataLayer = require('../lib/get-data-layer');
const { NO_WINDOW_WARNING } = require('../lib/messages');

describe('getDataLayer(window, customDataLayer)', () => {
  describe('When a custom data layer is not provided', () => {
    it('Returns window.dataLayer when the window object exists', () => {
      expect(window.dataLayer).toBeUndefined();
      const actual = getDataLayer(window);
      expect(window.dataLayer).toEqual([]);
      expect(actual).toBe(window.dataLayer);
    });

    it('Spits a warning to the console if there is no window object', () => {
      console.warn = jest.fn();
      getDataLayer();
      expect(console.warn).toHaveBeenCalledWith(NO_WINDOW_WARNING);
    });
  });

  describe('When a custom data layer is provided', () => {
    it('Returns the custom data layer if it is valid', () => {
      const customDataLayer = [];
      customDataLayer.push = () => {};
      const actual = getDataLayer(window, customDataLayer);
      const expected = customDataLayer;
      expect(actual).toEqual(expected);
    });

    it('Returns a new window.dataLayer if the custom data layer is invalid', () => {
      const customDataLayer = [];
      const actual = getDataLayer(window, customDataLayer);
      expect(window.dataLayer).toEqual([]);
      expect(actual).toEqual(window.dataLayer);
    });
  });
});

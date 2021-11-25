const createGoogleMapsMock = function createGoogleMapsMock() {
    const maps = {
      InfoWindow: jest.fn().mockImplementation(function () {
      createMVCObject(this);
      createMockFuncsFromArray(this, ['setPosition', 'setContent', 'open', 'close']);
      }),
      Map: jest.fn().mockImplementation(function (mapDiv, opts) {
        this.mapDiv = mapDiv;
        this.opts = opts;
        createMVCObject(this);
        createMockFuncsFromArray(this, ['setCenter', 'setClickableIcons', 'setHeading', 'setMapTypeId', 'setOptions', 'setStreetView', 'setTilt', 'setZoom', 'fitBounds', 'getBounds', 'panTo', 'panToBounds']);
      }),
      Polyline: function Polyline() {},
      Size: function Size() {}
      };
      return maps;
  };
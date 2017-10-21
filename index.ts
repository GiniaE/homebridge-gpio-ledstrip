/// <reference path="./typings/globals/node/index.d.ts" />

import GPIORGBLEDStripAccessory from "./lib/GPIORGBLEDStripAccessory";

module.exports = function (homebridge) {
  var exportTypes = {
    Accessory: homebridge.hap.Accessory,
    Service: homebridge.hap.Service,
    Characteristic: homebridge.hap.Characteristic,
    uuid: homebridge.hap.uuid,
  };

   GPIORGBLEDStripAccessory.init(exportTypes);

  homebridge.registerAccessory("homebridge-gpio-ledstrip", "GPIORGBLEDStrip", GPIORGBLEDStripAccessory);
};

/// <reference types="color-convert" />
import * as converter from 'color-convert'; 
import GPIORGBLEDStripAccessory from "./lib/GPIORGBLEDStripAccessory"; 
import {Gpio} from "pigpio"; 

export default function (homebridge) {
  var exportTypes = {
    Accessory: homebridge.hap.Accessory,
    Service: homebridge.hap.Service,
    Characteristic: homebridge.hap.Characteristic,
    uuid: homebridge.hap.uuid,
  };

   GPIORGBLEDStripAccessory.init(exportTypes);

  homebridge.registerAccessory("homebridge-gpio-ledstrip", "GPIORGBLEDStrip", GPIORGBLEDStripAccessory);
};

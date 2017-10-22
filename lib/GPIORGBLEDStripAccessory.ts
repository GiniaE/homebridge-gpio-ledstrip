import * as converter from 'color-convert';
import {Gpio} from "pigpio";
import {changeBase} from "./Runtime";


var Accessory, Service, Characteristic, uuid;

export default class GPIORGBLEDStripAccessory {

	private log;
	private name: string;
	private ledStripSvc;
	private bled: Gpio;
	private gled: Gpio;
	private rled: Gpio;

	// Base class methods
	private addService: (any) => any;
	private getService: (any) => any;
	private services: any[];
	private uuid_base: string;

	static init(exportTypes) {
		Accessory = exportTypes.Accessory;
		Service = exportTypes.Service;
		Characteristic = exportTypes.Characteristic;
		uuid = exportTypes.uuid;

		changeBase(GPIORGBLEDStripAccessory, Accessory);
	}

	constructor(log, config) {
		var name = config["name"];
		var id = uuid.generate('gpio-ledstrip.rgb.' + (config['id'] || this.name));
		Accessory.call(this, name, id);
		this.uuid_base = id;
		this.name = name;
		this.log = log;

		this.ledStripSvc = this.addService(Service.Lightbulb);

		var resetState = this.resetState.bind(this);
		//On/Off
		this.ledStripSvc.getCharacteristic(Characteristic.On)
			.on('change', resetState);
		//Brightness
		this.ledStripSvc.getCharacteristic(Characteristic.Brightness)
			.on('change', resetState);

		//Hue
		this.ledStripSvc.getCharacteristic(Characteristic.Hue)
			.on('change', resetState);

		//Sat
		this.ledStripSvc.getCharacteristic(Characteristic.Saturation)
			.on('change', resetState);

		this.rled = new Gpio(config["redPin"], {mode: Gpio.OUTPUT});
		this.gled = new Gpio(config["greenPin"], {mode: Gpio.OUTPUT});
		this.bled = new Gpio(config["bluePin"], {mode: Gpio.OUTPUT});
	}

	getServices(): any {
		return this.services;
	};

	private resetState()
	{
		if(!this.isOn())
		{
			this.updateRGB(0,0,0);
			return;
		}
		var brightness = this.brightness();
		if(brightness == 0)
		{
			this.updateRGB(0,0,0);
			return;
		}
		var rgb = converter.hsv.rgb([this.hue(), this.saturation(), brightness]);
		this.updateRGB(rgb[0], rgb[1], rgb[2]);
	};

	private updateRGB(red : number, green : number, blue : number )
	{
		this.log("Setting rgb values to: Red: "+ red + " Green: "+green+ " Blue: "+ blue);

		this.rled.pwmWrite(red);
		this.gled.pwmWrite(green);
		this.bled.pwmWrite(blue);

	}

	private isOn(): boolean {
		return this.ledStripSvc.getCharacteristic(Characteristic.On).value;
	}

	private brightness(): number {
		return this.ledStripSvc.getCharacteristic(Characteristic.Brightness).value;
	}

	private hue(): number {
		return this.ledStripSvc.getCharacteristic(Characteristic.Hue).value;
	}

	private saturation(): number {
		return this.ledStripSvc.getCharacteristic(Characteristic.Saturation).value;
	}
}

# homebridge-gpio-ledstrip
[RPi](https://www.raspberrypi.org) GPIO based LED Strip plugin for [Homebridge](https://github.com/nfarina/homebridge)

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-gpio-ledstrip
3. Update your configuration file. See sample config.json snippet below. 

# Configuration

Configuration sample:

 ```
    "accessories": [
      {
        "accessory": "GPIORGBLEDStrip",
        "name": "Kitchen Cabinet Strip",
        "redPin": 22,
        "greenPin": 27,
        "bluePin": 17
      }
    ]
```

Fields: 

* "accessory": Must always be "GPIORGBLEDStrip" (required)
* "name": Can be anything (required)
* "redPin": GPIO pin that is used to set red value (required)
* "greenPin": GPIO pin that is used to set green value (required)
* "bluePin": GPIO pin that is used to set blue value (required)

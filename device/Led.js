const gpio = require("onoff").Gpio;

function Led(gpioIndex) {
    this.pin = new gpio(gpioIndex, 'out');
    let pin = this.pin;

    this.on = function () {
        pin.write(gpio.HIGH, () => console.log("Led " + gpioIndex + " on"));
    };

    this.off = function () {
        pin.write(gpio.LOW, () => console.log("Led " + gpioIndex + " off"));
    }
}

module.exports = {Led: Led};
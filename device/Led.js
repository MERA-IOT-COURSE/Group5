const gpio = require("onoff").Gpio;

function Led(gpioIndex) {
    this.pin = new gpio(gpioIndex, 'out');
    let pin = this.pin;

    this.on = function (callback) {
        let ledOn = "Led " + gpioIndex + " on";
        pin.write(gpio.HIGH, () => console.log(ledOn));
        callback.call(this, ledOn);
    };

    this.off = function (callback) {
        let ledOff = "Led " + gpioIndex + " off";
        pin.write(gpio.LOW, () => console.log(ledOff));
        callback.call(this, ledOff);
    }
}

module.exports = {Led: Led};
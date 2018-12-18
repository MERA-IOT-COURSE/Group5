const gpio = require("onoff").Gpio;

function Led(gpioIndex) {
    let pin = new gpio(gpioIndex, 'out');

    let write = async function (voltage, value) {
        return new Promise(resolve => {
            pin.write(voltage, () => console.log(value));
            resolve(value);
        });
    };

    this.on = async () => write(gpio.HIGH, "Led " + gpioIndex + " on");
    this.off = async () => write(gpio.LOW, "Led " + gpioIndex + " off");
}

module.exports = {Led: Led};
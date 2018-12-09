const dht = require('node-dht-sensor');


function DHT(gpioIndex) {
    let pin = gpioIndex;

    this.readTemperature = (callback) => {
        dht.read(11, pin, function (err, temperature) {
            if (err) {
                console.log(err);
                return
            }

            callback(temperature + "°C");
        });
    };

    this.readHumidity = (callback) => {
        dht.read(11, pin, function (err, temperature, humidity) {
            if (err) {
                console.log(err);
                return
            }

            callback.call(this, humidity + "%");
        });
    }
}

module.exports = {
    DHT: DHT
};
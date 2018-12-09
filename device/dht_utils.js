const dht = require('node-dht-sensor');

function readTemperature(callback) {
    dht.read(11, 18, function (err, temperature) {
        if (err) {
            console.log(err);
            return
        }

        callback(temperature + "°C");
    });
}

function readHumidity(callback) {
    dht.read(11, 18, function (err, temperature, humidity) {
        if (err) {
            console.log(err);
            return
        }

        callback.call(this, humidity + "%");
    });
}

module.exports = {
    readTemperature: readTemperature,
    readHumidity: readHumidity
};
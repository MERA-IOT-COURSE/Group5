const dht = require('node-dht-sensor');

function readTemperature() {
    dht.read(11, 18, function (err, temperature, humidity) {
        if (err) {
            console.log(err);
            return
        }

        return temperature.toFixed(1) + '°C';
    });
}

function readHumidity() {
    dht.read(11, 18, function (err, temperature, humidity) {
        if (err) {
            console.log(err);
            return
        }

        return humidity.toFixed(1) + '%';
    });
}

module.exports = {
    readTemperature: readTemperature,
    readHumidity: readHumidity
};
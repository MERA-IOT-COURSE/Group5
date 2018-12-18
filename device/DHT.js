const dht = require('node-dht-sensor');

function DHT(gpioIndex) {
    let read = async isTemperature =>
        new Promise(
            resolve => dht.read(11, gpioIndex,
                (err, temperature, humidity) => {
                    if (err) {
                        console.log(err);
                        resolve()
                    }

                    resolve(isTemperature ? temperature + "°C" : humidity + "%");
                }
            )
        );

    this.readTemperature = async () => read(true);
    this.readHumidity = async () => read(false);
}

module.exports = {
    DHT: DHT
};
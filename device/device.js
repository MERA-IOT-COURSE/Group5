const mqtt = require('mqtt');
const shared = require('../common.js');
const REGISTER_OBJECT = require('message.js').REGISTER_OBJECT;
const Led = require('Led.js').Led;
const dht = require('node-dht-sensor');
const utils = require('utils');

let stringify = JSON.stringify;
var device = mqtt.connect(shared.BROKER_URL, {});

let LEDS = {
    led17: new Led(17)
};

function readTemAndHum() {
    dht.read(11, 18, function (err, temperature, humidity) {
        if (err) {
            console.log(err);
            return
        }

        //make constant
        let fractionDigits = 1;

        return 'temp: ' + temperature.toFixed(fractionDigits) + '°C, ' +
            'humidity: '`` + humidity.toFixed(fractionDigits) + '%';
    });
}

let actionCallbackMap = {
    1: LEDS.led17.on,
    2: LEDS.led17.off,
    3: readTemAndHum
};

device.on('connect', () => {
        device.publish(shared.TOPIC.INIT_MASTER_TOPIC, stringify(REGISTER_OBJECT));
        device.subscribe(shared.TOPIC.DEV_HW_TOPIC);
    }
);

device.on('message', (topic, message) => {
    if (topic !== shared.TOPIC.DEV_HW_TOPIC) {
        return
    }

    console.log("Message received: " + message);
    let jsonMessage = JSON.parse(message);
    let value = actionCallbackMap[jsonMessage.actionId].call();

    let response = {
        'sensor_id': jsonMessage.sensorId,
        'value': value,
        'tx': utils.now()
    };

    device.publish(shared.TOPIC.BE_HW_TOPIC, JSON.stringify(response));
});

device.on('error', error => console.log(error));
device.on('end', () => console.log('Ended'));
device.on('close', () => console.log('Closed'));
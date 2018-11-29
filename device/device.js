const mqtt = require('mqtt');
const shared = require('../common/constants.js');
const REGISTER_OBJECT = require('message.js').REGISTER_OBJECT;
const Led = require('Led.js').Led;
const dht = require('dht');
const utils = require('utils');

const device = mqtt.connect(shared.BROKER_URL, {});

let LEDS = {
    led17: new Led(17)
};

let actionCallbackMap = {
    1: LEDS.led17.on,
    2: LEDS.led17.off,
    3: dht.readTemperature,
    4: dht.readHumidity
};

device.on('connect', () => {
        device.publish(shared.TOPIC.INIT_MASTER_TOPIC, JSON.stringify(REGISTER_OBJECT));
        device.subscribe(shared.TOPIC.DEV_HW_TOPIC);
    }
);

// todo: react depending on mid
device.on('message', (topic, message) => {
    if (topic !== shared.TOPIC.DEV_HW_TOPIC) {
        return
    }

    console.log("Message received: " + message);
    let jsonMessage = JSON.parse(message);
    let value = actionCallbackMap[jsonMessage.actionId].call();

    /*SENSOR_DATA message*/
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
const mqtt = require('mqtt');
const shared = require('../common/constants.js');
const REGISTER_OBJECT = require('./message.js').REGISTER_OBJECT;
const respSensorAction = require('./message.js').respSensorAction;
const Led = require('./Led.js').Led;
const DHT = require('./DHT.js');
const utils = require('./utils.js');

const device = mqtt.connect(shared.BROKER_URL, {});

let led17 = new Led(17);
let dht18 = new DHT(18);

let actionCallbackMap = {
    1: led17.on,
    2: led17.off,
    3: dht18.readTemperature,
    4: dht18.readHumidity
};

device.on('connect', () => {
        device.publish(shared.TOPIC.INIT_MASTER_TOPIC, JSON.stringify(REGISTER_OBJECT));
        device.subscribe(shared.TOPIC.DEV_HW_TOPIC);
    }
);

device.on('message', (topic, message) => {
    console.log("Message received: " + message);

    if (topic !== shared.TOPIC.DEV_HW_TOPIC) {
        return
    }

    let payload = JSON.parse(message).data;

    //todo: replace with promises
    actionCallbackMap[payload.id.id]
        .call(this, (value => {
                utils.now(timestamp => {
                    let response = JSON.stringify(
                        respSensorAction(payload.id, payload.sensorId, value, timestamp, payload.requestId)
                    );

                    console.log("Send response: " + response);
                    device.publish(shared.TOPIC.BE_HW_TOPIC, response);
                })
            })
        );
});

device.on('error', error => console.log(error));
device.on('end', () => console.log('Ended'));
device.on('close', () => console.log('Closed'));
const mqtt = require('mqtt');
const shared = require('../common/constants.js');
const REGISTER_OBJECT = require('./message.js').REGISTER_OBJECT;
const Led = require('./Led.js').Led;
const dht = require('./dht_utils.js');
const utils = require('./utils.js');

const device = mqtt.connect("mqtt://192.168.1.1:1883", {});
//const device = mqtt.connect(shared.BROKER_URL, {});

let LEDS = {
    led17: new Led(17)
};

// every callback takes a function as an input
// this function will be called after calculations are done
// this function should take value as a parameter (such as humidity)
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

device.on('message', (topic, message) => {
    console.log("Message received: " + message);

    if (topic !== shared.TOPIC.DEV_HW_TOPIC) {
        return
    }

    let payload = JSON.parse(message).data;

    //todo: refactor
    actionCallbackMap[payload.id.id]
        .call(this, (value => {
                utils.now(timestamp => {
                    /*RESP_SENSOR_ACTION message*/
                    let response = JSON.stringify({
                            mid: shared.MESSAGES.RESP_SENSOR_ACTION,
                            data: {
                                id: payload.id,
                                sensor_id: payload.sensorId,
                                status: 'OK',
                                data: {
                                    value: value,
                                    tx: timestamp
                                },
                                requestId: payload.requestId
                            }
                        }
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
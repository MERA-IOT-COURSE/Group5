const express = require("express");
const mqtt = require('mqtt');
const shared = require('../common/constants.js');

const port = 3000;
const app = express();
const mqttClient = mqtt.connect(shared.BROKER_URL, {});

let sensorCallbackMap = {
    'temp_sensor': setTemperature,
    'hum_sensor': setHumidity
};

/*FUNCTIONS*/
function publish(sensorId, actionId, res) {
    //REQ_SENSOR_ACTION message
    let request = JSON.stringify({
        mid: shared.MESSAGES.REQ_SENSOR_ACTION,
        data: {
            id: actionId,
            sensorId: sensorId
        }
    });

    console.log("Send request: " + request);

    mqttClient.publish(shared.TOPIC.DEV_HW_TOPIC, request);
    res.end();
}

function setTemperature(temperature) {
    setElementInnerTest('temperature', temperature);
}

function setHumidity(humidity) {
    setElementInnerTest('humidity', humidity);
}

function setElementInnerTest(elementId, value) {
    document.getElementById(elementId).innerText = value;
}

/*FUNCTIONS*/

mqttClient.on("message", (topic, message) => {
    console.log("Message received: " + message);

    if (topic !== shared.TOPIC.BE_HW_TOPIC) {
        return
    }

    //RESP_SENSOR_ACTION
    let jsonMessage = JSON.parse(message);

    if (jsonMessage.data.sensorId === shared.SENSOR_IDS.LED) {
        return
    }

    sensorCallbackMap[jsonMessage.id].call(this, jsonMessage.value);
});

/*ROUTES*/
app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname}));
app.get('/on', (req, res) => publish(shared.SENSOR_IDS.LED, shared.ACTIONS.LED.ON, res));
app.get('/off', (req, res) => publish(shared.SENSOR_IDS.LED, shared.ACTIONS.LED.OFF, res));
app.get('/temperature', (req, res) => publish(shared.SENSOR_IDS.TEMP, shared.ACTIONS.DHT.TEMP, res));
app.get('/humidity', (req, res) => publish(shared.SENSOR_IDS.HUM, shared.ACTIONS.DHT.HUM, res));
app.listen(port, () => console.log(`App is listening on port ${port}!`));

const express = require("express");
const mqtt = require('mqtt');
const shared = require('../common.js');

const port = 3000;
const app = express();
var mqttClient = mqtt.connect(shared.BROKER_URL, {});

let sensorCallbackMap = {
    'temp_hum_sensor': setTempAndHum
};

mqttClient.on("message", (topic, message) => {
    console.log("Message received: " + message);

    if (topic !== shared.TOPIC.BE_HW_TOPIC) {
        return
    }

    let jsonMessage = JSON.parse(message);

    if (jsonMessage.sensorId === shared.SENSOR_IDS.LED) {
        return
    }

    sensorCallbackMap[jsonMessage.sensorId].call(this, jsonMessage.value);
});

function setTempAndHum(tempAndHum) {
    document.getElementById('tempAndHumOut').innerText = tempAndHum;
}

/*ROUTES*/
app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname}));
app.get('/on', (req, res) => publish(shared.SENSOR_IDS.LED, shared.ACTIONS.LED[0], res));
app.get('/off', (req, res) => publish(shared.SENSOR_IDS.LED, shared.ACTIONS.LED[1], res));
app.get('/temperatureAndHumidity', (req, res) => publish(shared.SENSOR_IDS.DHT, shared.ACTIONS.DHT[0], res));

function publish(sensorId, actionId, res) {
    mqttClient.publish(
        shared.TOPIC.DEV_HW_TOPIC,
        JSON.stringify({sensorId: sensorId, actionId: actionId})
    );
    res.end();
}

app.listen(port, () => console.log(`App is listening on port ${port}!`));

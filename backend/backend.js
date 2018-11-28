const express = require("express");
const parser = require('body-parser');
const mqtt = require('mqtt');
const shared = require('../common.js');

const port = 3000;
const app = express();
var mqttClient = mqtt.connect(shared.BROKER_URL, {});

app.get('/', (req, res) => res.sendFile('button.html', {root: __dirname}));

app.get('/on', (req, res) => {
    let msg = {sensorId: shared.LED_SENSOR_ID, actionId: shared.LED_ACTIONS[0]};
    mqttClient.publish(shared.TOPIC.DEV_HW_TOPIC, JSON.stringify(msg));
    res.end();
});

app.get('/off', (req, res) => {
    let msg = {sensorId: shared.LED_SENSOR_ID, actionId: shared.LED_ACTIONS[1]};
    mqttClient.publish(shared.TOPIC.DEV_HW_TOPIC, JSON.stringify(msg));
    res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

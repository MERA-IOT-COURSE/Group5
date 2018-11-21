const express = require("express");
const parser = require('body-parser');
const mqtt = require('mqtt');
const shared = require('../common.js');

const port = 3000;
const app = express();

const URL = "mqtt://10.42.0.10:1883";
var mqttClient = mqtt.connect(URL, {});

app.get('/', (req, res) => res.sendFile('button.html', {root: __dirname}));

app.get('/on', (req, res) => {
  let msg = {sensorId:shared.LED_SENSOR_ID, actionId: shared.LED_ACTIONS[0]};
  client.publish(shared.TOPIC.DEV_HW_TOPIC, msg);
  res.end();
});

app.get('/off', (req, res) => {
  let msg = {sensorId:shared.LED_SENSOR_ID, actionId: shared.LED_ACTIONS[1]};
  client.publish(shared.TOPIC.DEV_HW_TOPIC, msg);
  res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

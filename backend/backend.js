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
  //todo: send topic
  client.publish(shared.TOPIC.DEV_HW_TOPIC, {});
  res.end();
});

app.get('/off', (req, res) => {
client.publish(shared.TOPIC.DEV_HW_TOPIC, {});
  res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

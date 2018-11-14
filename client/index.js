var mqtt = require('mqtt');

let URL = "mqtt://10.42.0.10:1883";
let TOPIC_NAME = "ivan";

let options = {};

var client = mqtt.connect(URL, options);

client.on('connect', () => client.subscribe(TOPIC_NAME, options));

client.on('message', (topic, message) => {
  if (topic == TOPIC_NAME) {
    console.log("Message received: " + message);
  }
});

client.on('error', error => console.log(error));
client.on('end', () => console.log('Ended'));
client.on('close', () => console.log('Closed'));

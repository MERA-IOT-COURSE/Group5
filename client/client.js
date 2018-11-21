var mqtt = require('mqtt');
let stringify = JSON.stringify;

const HW_ID = '00000000f7be3be2';

const TOPIC = {
  IVAN_TOPIC: "ivan",
  INIT_MASTER_TOPIC: "init_master",
  BE_MASTER_TOPIC: "be_master",
  BE_HW_TOPIC: 'be_{hw_id}'.replace("{hw_id}", HW_ID), //todo: create function
  INIT_HW_TOPIC: 'init_{hw_id}'.replace("{hw_id}", HW_ID),
  DEV_HW_TOPIC: 'dev_{hw_id}'.replace("{hw_id}", HW_ID)
};

const URL = "mqtt://10.42.0.10:1883";

const options = {};

var client = mqtt.connect(URL, options);

const REGISTER_OBJECT = {
  "version": 1.0,
  "hw_id": HW_ID,
  "name": 'Group 5',
  "sensors": undefined,
  "actions": undefined
}

client.on('connect', () => {
    // todo: replace with INIT_HW_TOPIC
    client.subscribe(TOPIC.INIT_MASTER_TOPIC);
    client.publish(TOPIC.INIT_MASTER_TOPIC, stringify(REGISTER_OBJECT));
  }
);

client.on('message', (topic, message) => {
  //if (topic == TOPIC_NAME) {
    console.log("Message received: " + message);
  //}
});

//client.on('error', error => console.log(error));
//client.on('end', () => console.log('Ended'));
//client.on('close', () => console.log('Closed'));

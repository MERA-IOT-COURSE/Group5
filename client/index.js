var mqtt = require('mqtt');

let URL = "mqtt://10.42.0.10:1883";
let TOPIC_NAME = "ivan;"

let options = {
  clientId:"00000000f7be3be2"
};

var client = mqtt.connect(URL, options);

client.on('connect', () => {
  console.log("Connected");
  client.subscribe(
    TOPIC_NAME,
    {},
    (err) => {
      if (!err) {
        client.publish(TOPIC_NAME, "Hello, world!");
      }
    });
});

client.on('message', (topic, message) => {
  //if(topic === TOPIC_NAME) {
    console.log("Publish handling, message: " + message);
  //}
});

client.on('error', error => console.log(error));

var mqtt=require('mqtt');

let URL = "mqtt://10.42.0.10:1883";
let TOPIC_NAME = "ivan;"

let options = {
  clientId:"00000000f7be3be2"
};

var client = mqtt.connect(URL, options);

client.on('connect', () => {
  client.subscribe(TOPIC_NAME);
});

client.on('message', (topic, message) => {
  //if(topic === TOPIC_NAME) {
    console.log(message == null ? "Default message" : message);
  //}
});

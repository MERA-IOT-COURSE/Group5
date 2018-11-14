var mqtt=require('mqtt');

let URL = "mqtt://10.42.0.10:1883";
let options = {
  clientId:"00000000f7be3be2"
};
var client = mqtt.connect(URL,options);

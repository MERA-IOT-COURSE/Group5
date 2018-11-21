const mqtt = require('mqtt');   
const shared = require('../common.js');
//const gpio = require("onoff").Gpio;

let stringify = JSON.stringify;
//let pin = new gpio(17, 'out');

var client = mqtt.connect(shared.BROKER_URL, {});

const REGISTER_OBJECT = {
  "version": shared.PROTOCOL_VERSION,
  "hw_id": shared.HW_ID,
  "name": shared.CLIENT_NAME,
  "sensors": {
    id : shared.LED_SENSOR_ID,
    type: shared.LED_TYPE,
    actions: shared.LED_ACTIONS
  },
  "actions": {}
};

client.on('connect', () => {
    // todo: replace with INIT_HW_TOPIC
    //client.subscribe(TOPIC.INIT_MASTER_TOPIC);
    client.publish(shared.TOPIC.INIT_MASTER_TOPIC, stringify(REGISTER_OBJECT));
    client.subscribe(shared.TOPIC.DEV_HW_TOPIC);
  }
);

client.on('message', (topic, message) => {
  // how to parse message and detect action id?
  //pin.write(gpio.HIGH, () => console.log("On"));
  //pin.write(gpio.LOW, () => console.log("Off"));
  console.log("Message received: " + message);
});

client.on('error', error => console.log(error));
client.on('end', () => console.log('Ended'));
client.on('close', () => console.log('Closed'));

function getHardwareId() {
      const cpuinfoPath = "/proc/cpuinfo"

      var cpuinfo = fs.readFileSync(cpuinfoPath, 'utf-8')
      var hardwareId = null

      // Serial       : 0000000043da31c3
      var hardwareIdRegexp = /Serial\s*:\s*(\w+)/g;

      var match = hardwareIdRegexp.exec(cpuinfo);

      if (match) {
          hardwareId = match[1]
      }

      return hardwareId
}

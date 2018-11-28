const mqtt = require('mqtt');
const shared = require('../common.js');
const gpio = require("onoff").Gpio;

let stringify = JSON.stringify;
var client = mqtt.connect(shared.BROKER_URL, {});

function Led(gpioIndex) {
  this.pin = new gpio(gpioIndex, 'out');

  this.on = function() {
    this.pin.write(gpio.HIGH, () => console.log("Led " + gpioIndex + " on"));
  };

  this.off = function() {
    this.pin.write(gpio.LOW, () => console.log("Led " + gpioIndex + " off"));
  }
}

let LEDS = {
  led17: new Led(17)
};

let sensorActionsMap = {
  'led_sensorled.on': LEDS.led17.on,
  'led_sensorled.off': LEDS.led17.off
};

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
    client.publish(shared.TOPIC.INIT_MASTER_TOPIC, stringify(REGISTER_OBJECT));
    client.subscribe(shared.TOPIC.DEV_HW_TOPIC);
  }
);

client.on('message', (topic, message) => {
  console.log("Message received: " + message);
  let jsonMessage = JSON.parse(message);
  sensorActionsMap[jsonMessage.sensorId + jsonMessage.actionId].call();
  //todo response on BE_HW_TOPIC
});

client.on('error', error => console.log(error));
client.on('end', () => console.log('Ended'));
client.on('close', () => console.log('Closed'));


// todo: use
/*function getHardwareId() {
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
}*/

const express = require("express");
const mqtt = require('mqtt');
const shared = require('../common/constants.js');
const cors = require('cors');

const port = 3000;
const app = express();
app.use(cors());
app.use('/css', express.static(__dirname + '/view/css'));
app.use('/js', express.static(__dirname + '/view/js'));
app.use(express.static(__dirname + '/view/fonts'));

const backend = mqtt.connect("mqtt://localhost:1883", {});
//const backend = mqtt.connect(shared.BROKER_URL, {});

let requestIdSequence = 0;
let requestResponseMap = new Map();

/*FUNCTIONS*/
function publish(sensorId, actionId, res) {
    let requestId = ++requestIdSequence;
    //REQ_SENSOR_ACTION message
    let request = JSON.stringify({
        mid: shared.MESSAGES.REQ_SENSOR_ACTION,
        data: {
            id: actionId,
            sensorId: sensorId,
            requestId: requestId
        }
    });

    console.log("Send request: " + request);
    requestResponseMap.set(requestId, res);
    backend.publish(shared.TOPIC.DEV_HW_TOPIC, request);
}

/*FUNCTIONS*/

backend.on('connect', () => backend.subscribe(shared.TOPIC.BE_HW_TOPIC));

backend.on('message', (topic, message) => {
    console.log("Message received: " + message);

    if (topic !== shared.TOPIC.BE_HW_TOPIC) {
        return
    }

    //RESP_SENSOR_ACTION
    let payload = JSON.parse(message).data;

    if (payload.sensorId === shared.SENSOR_IDS.LED) {
        return
    }

    let requestId = payload.requestId;
    let response = requestResponseMap.get(requestId);
    requestResponseMap.delete(requestId);
    response.send(payload.data.value);
    response.end();
});

/*ROUTES*/
app.get('/', (req, res) => res.sendFile('view/index.html', {root: __dirname}));
app.get('/on', (req, res) => publish(shared.SENSOR_IDS.LED, shared.ACTIONS.LED.ON, res));
app.get('/off', (req, res) => publish(shared.SENSOR_IDS.LED, shared.ACTIONS.LED.OFF, res));
app.get('/temperature', (req, res) => publish(shared.SENSOR_IDS.TEMP, shared.ACTIONS.DHT.TEMP, res));
app.get('/humidity', (req, res) => publish(shared.SENSOR_IDS.HUM, shared.ACTIONS.DHT.HUM, res));

//todo: implement
app.get('/plot', (req, res) => res.end());
app.listen(port, () => console.log(`App is listening on port ${port}!`));

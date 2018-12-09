const shared = require('../common/constants.js');

function register(hwId) {
    return {
        "mid": shared.MESSAGES.REGISTER,
        "data": {
            "version": shared.PROTOCOL_VERSION,
            "hw_id": hwId,
            "name": shared.CLIENT_NAME,
            "sensors": [
                {
                    id: shared.SENSOR_IDS.LED,
                    type: shared.SENSOR_TYPE.LED,
                    actions: shared.ACTIONS.LED
                },
                {
                    id: shared.SENSOR_IDS.TEMP,
                    type: shared.SENSOR_TYPE.TEMPERATURE,
                    actions: shared.ACTIONS.DHT.TEMP
                },
                {
                    id: shared.SENSOR_IDS.HUM,
                    type: shared.SENSOR_TYPE.HUMIDITY,
                    actions: shared.ACTIONS.DHT.HUM
                }
            ],
            "actions": {}
        }
    }
}

function respSensorAction(id, sensorId, value, time, requestId) {
    return {
        mid: shared.MESSAGES.RESP_SENSOR_ACTION,
        data: {
            id: id,
            sensor_id: sensorId,
            status: 'OK',
            data: {
                value: value,
                tx: time
            },
            requestId: requestId
        }
    }
}

module.exports = {
    REGISTER_OBJECT: register(shared.HW_ID),
    respSensorAction: respSensorAction
};
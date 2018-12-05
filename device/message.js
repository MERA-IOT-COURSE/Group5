const shared = require('../common/constants.js');

const REGISTER_OBJECT = {
    "mid": shared.MESSAGES.REGISTER,
    "data" : {
        "version": shared.PROTOCOL_VERSION,
        "hw_id": shared.HW_ID,
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
};

module.exports = {REGISTER_OBJECT: REGISTER_OBJECT};
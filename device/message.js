const shared = require('../common.js');

const REGISTER_OBJECT = {
    "version": shared.PROTOCOL_VERSION,
    "hw_id": shared.HW_ID,
    "name": shared.CLIENT_NAME,
    "sensors": [
        {
            id: shared.SENSOR_IDS.LED,
            type: shared.SENSOR_TYPE,
            actions: shared.ACTIONS.LED
        },

        {
            id: shared.SENSOR_IDS.DHT,
            type: shared.SENSOR_TYPE,
            actions: shared.ACTIONS.DHT
        }
    ],
    "actions": {}
};

module.exports = {REGISTER_OBJECT: REGISTER_OBJECT};
const HW_ID = '00000000f7be3be2';

const TOPIC = {
    INIT_MASTER_TOPIC: "init_master",
    BE_MASTER_TOPIC: "be_master",
    BE_HW_TOPIC: 'be_{hw_id}'.replace("{hw_id}", HW_ID),
    INIT_HW_TOPIC: 'init_{hw_id}'.replace("{hw_id}", HW_ID),
    DEV_HW_TOPIC: 'dev_{hw_id}'.replace("{hw_id}", HW_ID)
};

module.exports = {
    TOPIC: TOPIC,
    BROKER_URL: "mqtt://10.42.0.10:1883",
    HW_ID: HW_ID,
    PROTOCOL_VERSION: 1.0,
    CLIENT_NAME: 'Group 5',
    SENSOR_IDS: {
        LED: 'led_sensor',
        DHT: 'temp_hum_sensor'
    },
    SENSOR_TYPE: ['led_type', 'temp_hum_type'],
    ACTIONS: {
        LED: [{id: 1, name: 'on'}, {id: 2, name: 'off'}],
        DHT: [{id: 3, name: 'getTempAndHum'}]
    }
};

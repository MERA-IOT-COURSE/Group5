const HW_ID = '00000000f7be3be2';

const TOPIC = {
    INIT_MASTER_TOPIC: "init_master",
    BE_MASTER_TOPIC: "be_master",
    BE_HW_TOPIC: 'be_' + HW_ID,
    INIT_HW_TOPIC: 'init_' + HW_ID,
    DEV_HW_TOPIC: 'dev_' + HW_ID
};

module.exports = {
    TOPIC: TOPIC,
    //BROKER_URL: "mqtt://10.42.0.10:1883",
    BROKER_URL: "mqtt://10.42.0.114:1883",
    HW_ID: HW_ID,
    PROTOCOL_VERSION: 1.0,
    CLIENT_NAME: 'Group 5',
    SENSOR_IDS: {
        LED: 'led_sensor',
        TEMP: 'temp_sensor',
        HUM: 'hum_sensor'
    },
    SENSOR_TYPE: {
        LED: 'led.one_color',
        TEMPERATURE: 'sensor.temperature',
        HUMIDITY: 'sensor.humidity'
    },
    ACTIONS: {
        LED: {
            ON: {id: 1, name: 'on'},
            OFF: {id: 2, name: 'off'}
        },
        DHT: {
            TEMP: {id: 3, name: 'temperature'},
            HUM: {id: 4, name: 'humidity'}
        },
    },
    MESSAGES: {
        REGISTER: "REGISTER",
        REGISTER_RESP: "REGISTER_RESP",
        SENSOR_DATA: "SENSOR_DATA",
        REQ_DEVICE_ACTION: "REQ_DEVICE_ACTION",
        REQ_SENSOR_ACTION: "REQ_SENSOR_ACTION",
        RESP_DEVICE_ACTION: "RESP_DEVICE_ACTION",
        RESP_SENSOR_ACTION: "RESP_SENSOR_ACTION"
    }
};

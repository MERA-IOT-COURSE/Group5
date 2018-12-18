const BE_ADDRESS = "http://" + window.location.host;

const URL = {
    LED_ON: BE_ADDRESS + "/on",
    LED_OFF: BE_ADDRESS + "/off",
    TEMP: BE_ADDRESS + "/temperature",
    HUM: BE_ADDRESS + "/humidity"
};

function setElementInnerTest(elementId, value) {
    document.getElementById(elementId).innerText = value;
}

let sendGet = (url, callback) => {
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            callback.call(this, request.responseText);
        }
    };
    request.send();
};

let sendOnRequest = () => sendGet(URL.LED_ON, value => {});
let sendOffRequest = () => sendGet(URL.LED_OFF, value => {});
let sendTemperatureRequest = () => sendGet(URL.TEMP, value => setElementInnerTest('temperature', value));
let sendHumidityRequest = () => sendGet(URL.HUM, value => setElementInnerTest('humidity', value));
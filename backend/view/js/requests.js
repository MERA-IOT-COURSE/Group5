const BE_ADDRESS = "http://" + window.location.host;

const URL = {
    LED_ON: BE_ADDRESS + "/on",
    LED_OFF: BE_ADDRESS + "/off",
    TEMP: BE_ADDRESS + "/temperature",
    HUM: BE_ADDRESS + "/humidity",
    PLOT: BE_ADDRESS + "/plot"
};

function setElementInnerTest(elementId, value) {
    document.getElementById(elementId).innerText = value;
}

let sendGet = (url, callback) => {
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback) {
            callback.call(this, request.responseText);
        }
    };
    request.send();
};

let sendOnRequest = () => sendGet(URL.LED_ON);
let sendOffRequest = () => sendGet(URL.LED_OFF);
let sendTemperatureRequest = () => sendGet(URL.TEMP, value => setElementInnerTest('temperature', value));
let sendHumidityRequest = () => sendGet(URL.HUM, value => setElementInnerTest('humidity', value));

let sendPlotRequest = () => {
    //stub data
    let plotData = document.getElementById('temperaturePlot').data[0];
    plotData.x = ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'];
    plotData.y = [1, 3, 6];
    Plotly.redraw('temperaturePlot');
};

/*sendGet(URL.PLOT, value => {
    //todo: parse value
})*/
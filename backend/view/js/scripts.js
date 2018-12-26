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

function addClass(elementId, clazz) {
    document.getElementById(elementId).classList.add(clazz);
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

let initPlot = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        addClass('temperaturePlot', "invisible");
        addClass('plotRow', "invisible");
        return;
    }

    Plotly.newPlot('temperaturePlot', [
        {
            x: [],
            y: [],
            type: 'scatter'
        }
    ], undefined, {responsive: true});
};

let sendOnRequest = () => sendGet(URL.LED_ON);
let sendOffRequest = () => sendGet(URL.LED_OFF);
let sendTemperatureRequest = () => sendGet(URL.TEMP, value => setElementInnerTest('temperature', value));
let sendHumidityRequest = () => sendGet(URL.HUM, value => setElementInnerTest('humidity', value));

let sendPlotRequest = () => sendGet(URL.PLOT, value => {
    console.log("Value " + value);
    let temperatures = JSON.parse(value);
    let plotData = document.getElementById('temperaturePlot').data[0];
    plotData.x = temperatures.map(element => element.date);
    plotData.y = temperatures.map(element => element.temperature);
    Plotly.redraw('temperaturePlot');
});
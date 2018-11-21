const express = require("express");
const parser = require('body-parser');
const gpio = require("onoff").Gpio;

const port = 3000;
const app = express();

let pin = new gpio(17, 'out');

app.get('/', (req, res) => res.sendFile('button.html', {root: __dirname}));

app.get('/on', (req, res) => {
  pin.write(gpio.HIGH, () => console.log("On"));
  res.end();
});

app.get('/off', (req, res) => {
  pin.write(gpio.LOW, () => console.log("Off"));
  res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

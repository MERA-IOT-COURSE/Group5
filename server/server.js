const express = require("express");
const parser = require('body-parser');
const gpio = require("onoff").Gpio;

const port = 3000;
const app = express();

let pin = new gpio(17, 'out');
pin.write(gpio.HIGH, () => console.log("Happy NY!"));

app.get('/testendpoint', (req, res) => {
  res.send("Hello, world!");
  return;
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

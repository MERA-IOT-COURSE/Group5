const express = require("express");
const parser = require('body-parser');

const app = express();

app.get('/testendpoint', (req, res) => {
  res.send("Hello, world!");
  return;
})

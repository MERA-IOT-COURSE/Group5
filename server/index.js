const express = require("express");
const parser = require('body-parser');

const port = 3000;
const app = express();

app.get('/testendpoint', (req, res) => {
  res.send("Hello, world!");
  return;
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

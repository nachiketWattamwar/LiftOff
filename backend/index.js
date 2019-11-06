const express = require('express');
const bodyParser = require('body-parser');
var cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const { mongoose } = require("./db/mongoose");
app.get('/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const { mongoose } = require("../backend/db/mongoose");
const { Space, Spacebudget } = require("../backend/models/space");

app.get("/nasaData", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  //res.send(JSON.stringify({ greeting: `Hello ${name}!` }));

  Space.find({}, function(err, nasaData) {
    console.log("==============data=========", nasaData);
    let satellites = nasaData.map(n => {
      console.log("n is ", n.satellites);
      return n.satellites;
    });

    res.send(satellites);
  });
});

app.get("/nasaspacebudget", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  Spacebudget.find({}, function(err, nasaData) {
    let budgets = nasaData.map(n => {
      console.log("budget is ", n.budget);
      return n.budget;
    });

    res.send(budgets);
  });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);

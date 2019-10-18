var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://cmpe280:cmpe280@ds335668.mlab.com:35668/cmpe280",{
    poolSize: 10
    // other options can go here
  },
  () => {
    console.log("connected to mongoDB");
  }
);

module.exports = { mongoose };

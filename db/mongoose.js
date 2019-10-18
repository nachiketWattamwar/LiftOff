var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb+srv://admin:admin@cluster0-nywer.mongodb.net/test?retryWrites=true&w=majority",{
    poolSize: 10
    // other options can go here
  },
  () => {
    console.log("connected to mongoDB");
  }
);

module.exports = { mongoose };

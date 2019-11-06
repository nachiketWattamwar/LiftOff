var mongoose = require("mongoose");

const Spaceschema = new mongoose.Schema({
  name: {
    type: String
  },
  descp: {
    type: String
  }
});

var Space = mongoose.model("agency", Spaceschema);

module.exports = { Space };

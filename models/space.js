var mongoose = require("mongoose");

const Spaceschema = new mongoose.Schema({
  name: {
    type: String
  },
  descp: {
    type: String
  }
});

var Space = mongoose.model("space", Spaceschema);

module.exports = { Space };

var mongoose = require("mongoose");

const Spaceschema = new mongoose.Schema({
  satellites: {
    type: Number
  }
});

var Space = mongoose.model("nasasatellite", Spaceschema);

const Spaceschemabudget = new mongoose.Schema({
  budget: {
    type: Number
  }
});

var Spacebudget = mongoose.model("nasabudget", Spaceschemabudget);

module.exports = { Space: Space, Spacebudget: Spacebudget };
// module.exports = { Spacebudget };

var express = require("express");
var router = express.Router();

/*
 * GET home page.
 */
router.get("/", function(req, res) {
  res.render("pages/index");
});

router.get("/about", function(req, res) {
  console.log("inside about");
  //res.render("pages/about");
  res.render("pages/about2");
});

module.exports = router;

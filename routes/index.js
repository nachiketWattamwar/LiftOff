var express = require("express");
var router = express.Router();

/*
 * GET home page.
 */
router.get("/", function(req, res) {
  console.log("session: ", req.session);
  res.render("pages/index");
});

/*
 * GET registration page.
 */
router.get("/signup", function(req, res) {
  console.log("inside signup");
  res.render("pages/signup");
});

router.get("/about", function(req, res) {
  console.log("inside about");
  res.render("pages/about");
});

module.exports = router;

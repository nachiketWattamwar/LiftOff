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
// /*
//  * POST registration page.
//  */
// router.post("/register", ctrlMain.post_register);

// /*
//  * GET login page.
//  */
// router.get("/login", ctrlMain.get_login);

// /*
//  * POST login page.
//  */
// router.post("/login", ctrlMain.post_login);

// /*
//  * GET logout page.
//  */
// router.get("/logout", ctrlMain.get_logout);

// /*
//  * GET protected page.
//  */
// router.get("/protected", ctrlMain.loggedIn, ctrlMain.get_protected);

module.exports = router;

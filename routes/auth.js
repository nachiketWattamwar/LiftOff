var express = require("express");
var router = express.Router();
var routeNames = require("../controller/auth");

router.post("/login", routeNames.postLogin);

// Sending signup data from user to backend
router.post("/signup", routeNames.postSignup);

//logging out
router.get("/logout", routeNames.logout);

//crud
router.get("/crud", routeNames.getCrud);

module.exports = router;

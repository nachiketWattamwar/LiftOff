var express = require("express");
var router = express.Router();
var routeNames = require("../controller/auth");
var spaceData = require("../controller/spaceData");

router.get("/login", routeNames.getLogin);
router.get("/infoNasa", spaceData.nasaDatafunc);

router.post("/login", routeNames.postLogin);

// Sending signup data from user to backend
router.post("/signup", routeNames.postSignup);

//getting signup form from backend to user

router.get("/signup", routeNames.getSignup);

module.exports = router;

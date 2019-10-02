var express = require("express");
var router = express.Router();
var routeNames = require("../controller/auth");
var spaceData = require("../controller/spaceData");

router.get("/infoNasa", spaceData.nasaDatafunc);
router.get("/dashboard", routeNames.getDashboard);

module.exports = router;

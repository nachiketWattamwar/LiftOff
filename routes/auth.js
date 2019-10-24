var express = require("express");
var router = express.Router();
var routeNames = require("../controller/auth");

router.post("/login", routeNames.postLogin);

// Sending signup data from user to backend
router.post("/signup", routeNames.postSignup);

//logging out
router.get("/logout", routeNames.logout);

//crud display all
router.get("/crud", routeNames.getCrud);

//crud add new entry
router.post("/newEntry", routeNames.addNewEntry);

//crud update new entry
router.post("/postUpdateEntry", routeNames.updateEntry);

//crud update new entry
router.post("/postDeleteEntry", routeNames.deleteEntry);

//search
router.post("/search", routeNames.search);

module.exports = router;

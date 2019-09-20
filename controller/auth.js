var registeredUsers = [{ email: "admin@admin", password: "admin" }];
var nasaData = require("../controller/spaceData");
module.exports.getLogin = function(req, res) {
  res.render("pages/login");
};

module.exports.postLogin = function(req, res, next) {
  console.log("Registered users:");
  console.log(registeredUsers);
  console.log("Logging in: " + req.body.email + "/" + req.body.password);

  // Create an array of users with matching credentials.
  var matches = registeredUsers.filter(function(user) {
    return user.email === req.body.email && user.password === req.body.password;
  });

  console.log("Matching credentials: ");
  console.log(matches);

  if (matches.length === 0) {
    res.render("pages/invaliduser");
  } else {
    // The user is logged in for this session.
    req.session.user = matches[0];
    console.log("Sucessfully logged in:");
    console.log(req.session.user.email);
    console.log(req.cookies);
    //next();
    res.render("pages/loggedin", { username: req.body.email, data: nasaData });
  }
};

module.exports.getSignup = function(req, res) {
  res.render("pages/signup");
};

module.exports.postSignup = function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status("400");
    res.send("Invalid details!");
  } else {
    // Create an array of users with matching usernames.
    var matches = registeredUsers.filter(function(user) {
      return user.email === req.body.email;
    });

    // If there is a match, the user has already registered.
    if (matches.length > 0) {
      res.render("pages/registered");
    }

    // Register a new user.
    else {
      var newUser = {
        email: req.body.email,
        password: req.body.password
      };
      registeredUsers.push(newUser);
      console.log("New user:");
      console.log(newUser);
      console.log("Registered users:");
      console.log(registeredUsers);
      res.redirect("/auth/login");
    }
  }
};

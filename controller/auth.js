var registeredUsers = [
  {
    id: 1,
    email: "admin@admin.com",
    password: "$2b$10$3yryBFqI8by8PKGN6NWRu.im.wICQQm84nN5Y/3CMZ2bQTmnSOEJG"
  }
];
var nasaData = require("../controller/spaceData");
var bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.GetInfoNasa = function(req, res) {
  res.render("pages/infoNasa", { data: nasaData });
};

module.exports.getLogin = function(req, res) {
  res.render("pages/login");
};

module.exports.postLogin = function(req, res) {
  console.log("Registered users:");
  console.log(registeredUsers);
  console.log("Logging in: " + req.body.email + "/" + req.body.password);

  // Create an array of users with matching credentials.
  var matches = registeredUsers.filter(function(user) {
    return (
      user.email === req.body.email &&
      bcrypt.compareSync(req.body.password, user.password)
    );
  });

  console.log("Matching credentials: ");
  console.log(matches);

  if (matches.length === 0) {
    res.render("pages/invaliduser");
  } else {
    // The user is logged in for this session.
    req.session.userID = matches[0].id;
    console.log("session info is :");
    console.log(req.session);
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
      var salt = bcrypt.genSaltSync(saltRounds);
      var hash = bcrypt.hashSync(req.body.password, salt);

      var newUser = {
        id: registeredUsers.length + 1,
        email: req.body.email,
        password: hash
      };
      req.session.userID = newUser.id;
      registeredUsers.push(newUser);
      console.log("Registered users:");
      console.log(registeredUsers);
      res.redirect("/auth/login");
    }
  }
};

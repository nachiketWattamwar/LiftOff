const { User } = require("../models/user");
const { Space } = require("../models/space");
// var registeredUsers = [
//   {
//     id: 1,
//     email: "admin@admin.com",
//     password: "$2b$10$3yryBFqI8by8PKGN6NWRu.im.wICQQm84nN5Y/3CMZ2bQTmnSOEJG"
//   }
// ];
var nasaData = require("../controller/spaceData");
var bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.GetInfoNasa = function(req, res) {
  res.render("pages/infoNasa", { data: nasaData });
};

module.exports.getDashboard = function(req, res) {
  //console.log("==============dashboard=============", req.session);
  res.render("pages/loggedin");
};

module.exports.getCrud = function(req, res) {
  console.log("inside get crud function");

  Space.find(function(err, space) {
    if (err) console.log(err);
    if (space) {
      // console.log("=================space=======================", space);
      res.render("pages/getcrud", { data: space });
    } else {
      console.log(
        "===========================inside else of crud========================="
      );
    }
  });
};

module.exports.deleteEntry = function(req, res) {
  console.log("======================inside delete================");
  Space.findOneAndDelete(
    {
      name: req.body.name
    },
    function(err, doc) {
      if (err) {
        throw err;
      } else {
        console.log(
          "====================================Updated====================",
          doc
        );
        res.redirect("/auth/crud");
      }
    }
  );
};

module.exports.updateEntry = function(req, res) {
  Space.findOneAndUpdate(
    {
      name: req.body.name
    },
    { $set: { descp: req.body.descp } },
    { new: true },
    function(err, doc) {
      if (err) {
        throw err;
      } else {
        console.log(
          "====================================Updated====================",
          doc
        );
        res.redirect("/auth/crud");
      }
    }
  );
};

module.exports.addNewEntry = function(req, res) {
  //console.log("=================inside add new entry===================");
  Space.findOne(
    {
      name: req.body.name
    },
    function(err, space) {
      if (err) console.log(err);
      if (space) {
        console.log("Data already present", space);
      } else {
        var newentry = {
          name: req.body.name,
          descp: req.body.descp
        };
        var newSpaceData = new Space({
          name: req.body.name,
          descp: req.body.descp
        });

        const space = newSpaceData.save();
        //console.log("New spacedata created : ", space);

        //console.log("================new entry=============", newentry);
        res.redirect("/auth/crud");
      }
    }
  );
};

module.exports.search = function(req, res) {
  // console.log("======================inside search================");
  Space.findOne(
    {
      name: req.body.name
    },
    function(err, doc) {
      if (err) {
        throw err;
      } else {
        console.log(
          "====================================search====================",
          doc
        );
        res.redirect("/auth/crud");
      }
    }
  );
};

module.exports.logout = function(req, res) {
  console.log("session data ", req.session);
  res.clearCookie("MyCookieInfo");
  req.session.destroy(err => {
    if (err) {
      return console.log(err);
    }
    console.log("session destroyed");
  });
  res.redirect("/login");
};

module.exports.getLogin = function(req, res) {
  res.render("pages/login");
};

module.exports.postLogin = function(req, res) {
  //console.log("Registered users:");
  //console.log(registeredUsers);
  console.log("Logging in: " + req.body.email + "/" + req.body.password);

  // Create an array of users with matching credentials.
  // var matches = registeredUsers.filter(function(user) {
  //   return (
  //     user.email === req.body.email &&
  //     bcrypt.compareSync(req.body.password, user.password)
  //   );
  // });

  // console.log("Matching credentials: ");
  // console.log(matches[0]);

  // if (matches.length === 0) {
  //   res.render("pages/invaliduser");
  // } else {
  //   // The user is logged in for this session.
  //   req.session.userID = matches[0].id;
  //   res.cookie("MyCookieInfo", matches[0]);
  //   console.log("session info is :");
  //   console.log(req.session);
  //   //next();
  //   res.redirect("/privateRoutes/dashboard");
  // }
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err) {
        console.log(err);
        console.log("User not found");
      }
      if (user) {
        console.log(user);
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (err) {
            console.log(err);
          }
          if (!result) {
            console.log("Passwords dont match");
            res.render("pages/invaliduser");
          } else {
            req.session.email = user.email;
            res.cookie("MyCookieInfo", user);
            console.log("session info is :");
            console.log(req.session);
            //next();
            res.redirect("/privateRoutes/dashboard");
          }
        });
      } else {
        console.log("User not found");
        res.render("pages/invaliduser");
      }
    }
  );
};

module.exports.postSignup = function(req, res) {
  console.log("inside signup");

  if (!req.body.email || !req.body.password) {
    res.status("400");
    res.send("Invalid details!");
  } else {
    //Check if User already exists with the email
    User.findOne(
      {
        email: req.body.email
      },
      function(err, user) {
        if (err) console.log(err);
        if (user) {
          console.log("User already registered");
          res.render("pages/registered");
        } else {
          // Register a new user.
          var salt = bcrypt.genSaltSync(saltRounds);
          var hash = bcrypt.hashSync(req.body.password, salt);
          var newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            phone: req.body.phone
          };
          var newUserMongo = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            phone: req.body.phone
          });
          req.session.email = newUser.email;
          res.cookie("MyCookieInfo", newUser);
          const user = newUserMongo.save();
          console.log("New User created : ", user);
          //res.sendStatus(200).end();
          //registeredUsers.push(newUser);
          console.log("session  info:");
          console.log(req.session);
          res.redirect("/login");
        }
      }
    );
  }
};

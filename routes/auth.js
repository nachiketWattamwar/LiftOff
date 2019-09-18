var express = require("express");
var router = express.Router();

var registeredUsers = [{ email: "nachiket@gmail.com", password: "nachiket" }];
var nasaData = [
  {
    id: "1",

    name: "Project Mercury",

    start_date: "1958",

    end_date: "63",

    description: "First U.S. manned spaceflight mission.",

    image_url:
      "https://i.pinimg.com/originals/bb/01/7a/bb017a4718bbdd36b2e350c6c6a35b55.jpg"
  },

  {
    id: "2",

    name: "Project Gemini",

    start_date: "1961",

    end_date: "66",

    description:
      "Training for extravehicular activity, rendezvous and docking in preparation for the Apollo missions.",

    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/8/8d/Gemini_6_7.jpg"
  },

  {
    id: "3",

    name: "Project Apollo",

    start_date: "1961",

    end_date: "75",

    description:
      "The first and (so far)only exploration mission to successfully land humans on the moon.",

    image_url: "https://www.daviddarling.info/images2/Apollo_15_Irwin_Moon.jpg"
  },

  {
    id: "4",

    name: "Skylab",

    start_date: "1973",

    end_date: "79",

    description: "America's first and only independently built space station.",

    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/0/07/Skylab_%28SL-4%29.jpg"
  },

  {
    id: "5",

    name: "Space Shuttle Program",

    start_date: "1981",

    end_date: "2011",

    description: "Fleet of launchable and reusable space vehicles.",

    image_url:
      "https://media.wired.com/photos/5c6f46d93e8add2cdb917279/master/pass/spaceshuttle.jpg"
  },

  {
    id: "6",

    name: "International Space Station",

    start_date: "1993",

    end_date: "present",

    description:
      "Space research lab jointly managed by NASA and space agenices of Russia, Europe, Japan and Canada.",

    image_url: "https://cdn.mos.cms.futurecdn.net/Q8U3LcsBLsXX9mYksBx5eV.jpg"
  }
];

router.get("/login", function(req, res) {
  res.render("pages/login");
});
router.get("/infoNasa", function(req, res) {
  res.render("pages/infoNasa", { data: nasaData });
});

router.post("/login", function(req, res, next) {
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
});

// Sending signup data from user to backend
router.post("/signup", function(req, res) {
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
});

//getting signup form from backend to user

router.get("/signup", function(req, res) {
  res.render("pages/signup");
});

module.exports = router;

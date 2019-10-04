var express = require("express");
var app = express();
var path = require("path");
var index = require("./routes/index");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set path for static assets
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: "sid",
    secret: "String for encrypting cookies.",
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: true
    }
  })
);

var checkUser = function(req, res, next) {
  if (req.cookies.MyCookieInfo) {
    console.log("inside checkuser if ", req.cookies.MyCookieInfo);
    next();
  } else {
    console.log("inside checkuser else ", req.cookies);
    res.redirect("/login");
  }
};

var getLogin = function(req, res) {
  res.render("pages/login");
};

var getSignup = function(req, res) {
  res.render("pages/signup");
};

app.get("/", index);
app.use("/about", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/privateRoutes", checkUser, require("./routes/privateRoutes"));
app.use("/login", getLogin);
app.use("/signup", getSignup);
app.listen(3000);
console.log("listening on  3000");

var express = require("express");
var app = express();
var path = require("path");
var index = require("./routes/index");
var bodyParser = require("body-parser");
var session = require("express-session");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set path for static assets
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    name: "sid",
    saveUninitialized: false,
    resave: true,
    secret: "String for encrypting cookies.",
    httpOnly: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: true
    }
  })
);
app.get("/", index);
app.use("/about", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.listen(3000);
console.log("listening on  3000");

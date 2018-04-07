const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongojs = require("mongojs");

const PORT = process.env.PORT || 3001;
const app = express();

// Set the app up with morgan
app.use(logger("dev"));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database configuration
var databaseUrl = process.env.MONGODB_URI || "news_db";
var collections = ["articles"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});

//allow the api to be accessed by other apps
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

app.get("/", function(req, res) {
  res.send("hi");
});

app.post("/api/saved", function(req, res) {
  console.log("saveD route API");
});

app.get("/api/saved", function(req, res) {
  res.send("APP saved route");
});

// app.get("*", function(req, res) {
//   res.sendFile(__dirname + "/public/index.html");
// });

// Listen on port 3001
app.listen(PORT, function() {
  console.log(
    "🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!",
    PORT,
    PORT
  );
});

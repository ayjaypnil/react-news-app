const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongojs = require("mongojs");
const bluebird = require("bluebird");

const PORT = process.env.PORT || 3001;
const app = express();

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("95fc06a84c3242019177b79e752121ea");

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


app.get("/search/:q/:from/:to", function(req, res) {
      // To query /v2/top-headlines
      // All options passed to topHeadlines are optional, but you need to include at least one of them
    var query = req.params.q;
    var fromU = req.params.from;
    var toU = req.params.to;
    newsapi.v2
      .topHeadlines({
        q: query,
        pagesize: 10,
        language: "en",
        from: fromU,
        to: toU,
        sortBy: "relevancy"
      })
      .then(response => {
        console.log(response.articles);
        res.json(response);
      });
});

app.get("/", function(req, res) {
  res.send("hi");
});

app.post("/api/saved", function(req, res) {
  console.log(req.body);
  	db.articles.insert(req.body, function(error, savedArticle) {
      // Log any errors
      if (error) {
        res.send(error);
      } else {
        res.json(savedArticle);
      }
    });
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

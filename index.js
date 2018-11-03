const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiai = require("./routes/facebook/apiai");

const entities = require("./entities");

const app = express();

mongoose.Promise = require("bluebird");
mongoose
  .connect(
    "mongodb://tanmoy12:asdfgh123456@ds241530.mlab.com:41530/qjdj",
    { useMongoClient: true }
  )
  .then(() => {
    // if all is ok we will be here
    console.log("Start");
  })
  .catch(err => {
    // if error we will be here
    console.error("DB not connected");
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept," +
      "X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  //and remove cacheing so we get the most recent comments
  res.setHeader("Cache-Control", "no-cache");

  next();
});

// Serve static files from the React app

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.use(express.static(process.cwd() + "/public"));

const webhook = require("./routes/facebook/webhook");
app.use("/webhook", webhook);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port);
console.log(`Foodbot listening on ${port}`);

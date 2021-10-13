// server.js
// where your node app starts

// init project
const express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/1451001600000", function (req, res) {
  const unixTimestamp = 1451001600000;
  const dateObject = new Date(unixTimestamp);

  res.json({ unix: unixTimestamp, utc: dateObject.toUTCString() });
});

app.get("/api/:date", function (req, res) {
  const bodyDate = req.params.date;
  // if (!bodyDate) {
  //   const date = new Date();
  //   const unix = Date.parse(date);
  //   return res.json({ unix: unix, utc: date.toUTCString() });
  // }

  const date = new Date(bodyDate);

  if (date.toString() == "Invalid Date") {
    return res.json({
      error: "Invalid Date",
    });
  }

  const dateUnix = Date.parse(bodyDate);

  res.json({ unix: dateUnix, utc: date.toUTCString() });
});

app.get("/api/", function (req, res) {
  const date = new Date();
  const unix = Date.parse(date);
  return res.json({ unix: unix, utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port: " + listener.address().port);
});

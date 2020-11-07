// required packages
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/config").get(process.env.NODE_ENV);

// Impletations
mongoose.Promise = global.Promise;
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("client/build"));

// Connecting to database
mongoose.connect(
  config.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log("Error in DB Connection : " + err);
    else console.log("MongoDB Connection succeded");
  }
);

// Requests
require("./requests/userRequests")(app);
require("./requests/postRequests")(app);

// Production Code
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

// Final Connection
const port = process.env.PORT || 5000;
const host = "0.0.0.0";
app.listen(port, host, () => {
  console.log("Server running on port: " + port);
});

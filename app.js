// Config env
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const mongoClient = require("mongoose");

const routes = require("./routes");
const passport = require("passport");
const checkHeaders = require("./middlewares/checkHeaders");

require('./middlewares/passport')

mongoClient
  .connect(
    "mongodb+srv://bthanh2001:bthanh2001@cluster0.vy2vv.mongodb.net/SERPS?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Connected database from mongodb."))
  .catch((error) =>
    console.error(`❌ Connect database is failed with error which is ${error}`)
  );

const app = express();





// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(checkHeaders);
// Routes
app.use("/api/v1/", routes);

// Routes
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Server is OK!",
  });
});

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // response to client
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
const port = app.get("port") || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;


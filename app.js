const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const adx = require("./routes/ads");

const verifyToken = require("./middleware/verify-tokoen");

const app = express();

// Config
const config = require("./config");

mongoose
  .connect("mongodb://localhost/carsBackend")
  .then(() => {
    console.log("mongo db bağlantısı sağlandı");
  })
  .catch((err) => {
    console.log("hata: " + err);
  });
app.set("api_secret_key", config.api_secret_key);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("api/movies", verifyToken);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ads", adx);

app.use("/Images", express.static("Images"));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

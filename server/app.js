require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");

const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const documentRouter = require("./routes/document");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.io = require("socket.io")();
app.use("/", express.static(path.join(__dirname, "../client/build")));
const { connectDB } = require("./config/db");
const { connectSocket } = require("./socket/socket");

connectDB();
connectSocket(app.io);

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", documentRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (req.headers["content-type"] === "application/json") {
    res.json({
      result: "error",
    });
  } else {
    res.render("error");
  }
});

module.exports = app;

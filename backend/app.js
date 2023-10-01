// npm install --save express

// npm install --save-dev nodemon
// add start script to package.json

// npm install --save morgan
// npm install --save body-parser
// npm install --save mongoose
// npm install --save bcrypt
// --save just adds an entry point to package.json

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// connection to mongoDB
mongoose.connect(
  "mongodb+srv://jason45:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.fprvvlh.mongodb.net/"
  // {
  //     useMongoClient: true
  // }
);
mongoose.Promise = global.Promise;

const userRoutes = require("./api/routes/user");

// dev is format before the output
// morgan is a logging framework that works with next
app.use(morgan("dev"));

// body parser is used to parse the body of incoming requests and extract json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Prevents CORS errors.. Cross Origin Resource Sharing
// CHECK THIS IN TESTING AND SECURITY
app.use((req, res, next) => {
  // * means any origin, you can specify a specific origin
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // browser always sends an options request first
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// app.use is middleware
// whatever you pass to app.use() will be executed for every incoming request
app.use("/user", userRoutes);

// error handling
// Error object is available by default
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error); // forwards the error request
});

// This will handle both the pervious 404 error and any other error that happens in the app
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

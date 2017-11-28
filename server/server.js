const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/userModel');
const StringModel = require('./models/stringModel');
const Review = require('./models/reviewModel');
const cors = require('cors');
const middleware = require('./middleware');

const reviewsRoutes = require('./routes/reviews');
const stringsRoutes = require('./routes/strings');
const authRoutes = require('./routes/auth');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

const corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": false,
  credentials: true,
  "optionsSuccessStatus": 204
};

server.use(cors(corsOptions));

// mongoose.Promise = global.Promise;
// const connect = mongoose.connect(
//   'mongodb://localhost:27017/project',
//   { useMongoClient: true }
// );

server.use(require('express-session')({
  secret: '0dhjzFkz91aNOp1xqOmx',
  resave: false,
  saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

server.use('/', authRoutes);
server.use('/strings', stringsRoutes);
server.use('/strings/:id/reviews', reviewsRoutes);

// connect.then(() => {
//   server.listen(5000);
//   console.log('Server Listening on port 5000');
// }, (error) => {
//   console.log(error);
// });

module.exports = server;
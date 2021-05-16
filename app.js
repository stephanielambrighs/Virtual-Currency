var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('config');
const passport = require('./passport/passport');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiTransfersRouter = require('./routes/api/v1/transfers');
var apiLeaderboardRouter = require('./routes/api/v1/leaderboard');


const mongoose = require('mongoose');



// use current version
mongoose.set('useCreateIndex', true);
mongoose.connect(config.get('Database.conn'), {useNewUrlParser: true, useUnifiedTopology: true});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/transfers', passport.authenticate("jwt", { session: false}), apiTransfersRouter);
app.use('/api/v1/leaderboard', passport.authenticate("jwt", { session: false}), apiLeaderboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.use(function(req, res, next){

//   function verifyToken(req, res, next) {
//     var token = req.header('token');
//     if(!token) return res.status(401).send('Access Denied');
//       try {
//           token = jwt.verify(token, process.env.TOKEN_SECRET);
//           res.accessToken = token.accessToken;
//           next();
//       } catch {
//           res.status(400).send('Invalid Token');
//       }
//   }

//   console.log(verifyToken);
//   if(!verifyToken){
//     res.redirect('/login');
//   }
//   else{
//     next();
//   }
// });





// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('config');
const passport = require('./passport/passport');


//routes opladen
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiTransfersRouter = require('./routes/api/v1/transfers');
var apiLeaderboardRouter = require('./routes/api/v1/leaderboard');


const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true); //fix deprecation warning
mongoose.connect(config.get('Database.conn'), {useNewUrlParser: true, useUnifiedTopology: true}); //connecteer met de db

//express opstarten
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//functie implementeren voor route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/transfers', passport.authenticate("jwt", { session: false}), apiTransfersRouter); // alle de routes die aan /api/v1/transfers voldoen oplossen met apiTransfersRouter
app.use('/api/v1/leaderboard', passport.authenticate("jwt", { session: false}), apiLeaderboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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

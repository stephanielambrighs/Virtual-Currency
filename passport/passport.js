const passport = require('passport');
const User = require('../models/user');

// use local strategy that we set the plugin for
//register and login
passport.use(User.createStrategy());

//  user data for sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

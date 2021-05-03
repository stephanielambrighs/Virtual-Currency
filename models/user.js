const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const localMongoose = require('passport-local-mongoose');
const User = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    coins: Number
});

// you can sign in and login
User.plugin(localMongoose);


module.exports = mongoose.model('User', User);
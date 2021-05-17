const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const localMongoose = require('passport-local-mongoose');
const User = new Schema({
    fullname: String,
    username: String,
    email: String,
    coins: Number
});

// you can sign in and login
User.plugin(localMongoose); // zorgt dat we niet zelf ww moeten hashen en veilig maken, username meegeven (registratiefunctie met hashing, authenticate functie)

//user model exporteren
module.exports = mongoose.model('User', User);

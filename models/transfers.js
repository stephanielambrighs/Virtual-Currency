const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transferSchema = new Schema({
    userFrom: String,
    userTo : String,
    coins: Number,
    description: String,
    reason: String,
    date: String
})

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
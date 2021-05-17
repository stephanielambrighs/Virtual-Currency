const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transferSchema = new Schema({
    userFrom: String,
    userTo : String,
    coins: Number,
    description: String, // require true mogelijk als het verplicht moet zijn. maar bij ons niet van toepassing
    reason: String
})

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
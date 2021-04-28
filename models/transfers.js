const mongoose = require('mongoose');
const Shema = mongoose.Schema;
const transferSchema = new Shema({
    userFrom: String,
    userTo : String,
    coins: Number,
    discription: String
})

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
const mongoose = require('mongoose');
const Shema = mongoose.Schema;
const transferShema = new Shema({
    userFrom: String,
    userTo : String,
    coins: Number,
    discription: String
})

const Transfer = mongoose.model('Transfer', transferShema);

module.exports = Transfer;
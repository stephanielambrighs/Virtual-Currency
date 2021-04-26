const mongoose = require('mongoose');
const Shema = mongoose.Schema;
const transferShema = new Shema({
    text: String,
    user: String
})

const Transfer = mongoose.model('Transfer', transferShema);

module.exports = Transfer;
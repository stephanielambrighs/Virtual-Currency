const mongoose = require('mongoose');
const Shema = mongoose.Schema;
const transferShema = new Shema({
    
})

const Transfer = mongoose.model('Transfer', transferShema);

module.exports = Transfer;
// change leadboard to users-> singup
const { reset } = require('nodemon');
const User = require('../../../models/user');


function getAll(req, res) {
    User.find({}, function (err, docs) {
        if (!err) {
            res.json({
                "status": "success",
                "users": docs
            })
        }
    });
}



module.exports.getAll = getAll;

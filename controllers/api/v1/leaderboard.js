// change leadboard to users-> singup
const Leaderboard = require('../../../models/leaderboard');

function getAll(req, res) {
    Leaderboard.find({}, function (err, docs) {
        if (!err) {
            res.json({
                "status": "success",
                "data": docs
            })
        }
    });
}



module.exports.getAll = getAll;

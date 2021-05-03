const Transfer = require('../../../models/transfers');
const User = require('../../../models/user');


// haal alle transfers op (nog sorteren op gebruiker)
function getAllT(req, res) {
    Transfer.find({
        "userTo": req.user.fullname
    }, function (err, docs) {
        if (!err) {
            res.json({
                "status": "success",
                "data": docs
            })
        }
    });
}


//haal een specifieke transfer uit de databank
/*function getOneT(req, res) {
   Transfer.findOne({ id: req.params.id }, function (err, docs) {
        if (!err) {
            res.json({
                "status": "success transfer:id",
                "data": docs
            })
        }
    })

};*/


//voorwaarden om coins te kunnen/mogen sturen nog toevoegen
function createCoin(req, res) {
    let transfer = new Transfer();
    transfer.userFrom = req.user.fullname,
        transfer.coins = req.body.coins,
        transfer.reason = req.body.reason,
        transfer.description = req.body.description,
        transfer.userTo = req.body.userTo

    let oldSenderCoins = req.user.coins;
    let newSenderCoins = req.user.coins - req.body.coins;
    console.log(oldSenderCoins, newSenderCoins);

    //find coins receiver
    User.find({
        "fullname": transfer.userTo,
    },
        (err, doc) => {
            console.log(doc, 'sdgsdg');


            transfer.save(function (err, result) {
                if (!err) {
                    res.json(result);
                    console.log(result);
                }
                else {
                    res.send(err);
                }
            });

        });

}


const getUser = (req, res) => {
    console.log(req.user);

    User.find({
        "_id": req.user._id
    }, (err, docs) => {
        res.json({
            "status": "success",
            "user": docs
        })
    })
}





module.exports.getAllT = getAllT;
/*module.exports.getOneT= getOneT;*/
module.exports.createCoin = createCoin;
module.exports.getUser = getUser;
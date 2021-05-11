const Transfer = require('../../../models/transfers');
const User = require('../../../models/user');



// haal alle inkomende transfers op
function getAllIncomingT(req, res) {
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


// haal alle transfers op 
function getAllT(req, res) {
    Transfer.find({
        $or: [{ "userTo": req.user.fullname }, { "userFrom": req.user.fullname }] //https://docs.mongodb.com/manual/reference/operator/query/or/
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
    //console.log(oldSenderCoins, newSenderCoins);


    User.find({ "fullname": req.user.fullname }, (err, docS) => {
        User.find({ "fullname": transfer.userTo }, (errR, docR) => {
            //console.log(docS);
            //console.log(docR);

            if (docR[0] == null) {
                res.json({
                    "status": "error",
                    "message": "De user waar je coins naar wilde sturen is niet gevonden",
                })
            } else {
                if (docS[0].fullname == docR[0].fullname) {
                    res.json({
                        "status": "error",
                        "message": "je kan geen coins naar jezelf sturen",
                    })
                } else {
                    if (docS[0].coins >= req.body.coins) {
                        if (transfer.coins == 0) {
                            res.json({
                                "status": "error",
                                "message": "je moet meer dan 0 coins per keer sturen.",
                            })
                        } else {
                            let coinSend = req.body.coins
                            if (coinSend < 0) {
                                res.json({
                                    "status": "error",
                                    "message": "je kan geen negatieve bedragen sturen!",
                                })
                            } else {
                                if (docS.length) {
                                    transfer.save((err, doc) => {
                                        if (err) {
                                            res.json({
                                                "status": "error",
                                                "message": "Er is iets misgelopen, de coins zijn niet verstuurd",
                                            })
                                        }
                                        if (!err) {
                                            res.json({
                                                "status": "success",
                                                "message": "Coins verstuurd",
                                                "data": {
                                                    "transfer": doc,
                                                }
                                            })
                                        }
                                    })

                                    //find and update user coins
                                    User.findOneAndUpdate({
                                        "fullname": req.user.fullname
                                    }, { coins: newSenderCoins }, (err, doc) => { })

                                    let oldReceiverCoins = docR[0].coins
                                    let newReceiverCoins = oldReceiverCoins + transfer.coins
                                    //find and update user coins
                                    User.findOneAndUpdate({
                                        "fullname": docR[0].fullname
                                    }, { coins: newReceiverCoins }, (err, doc) => { })


                                } else {
                                    res.json({
                                        "status": "error",
                                        "message": "De user waar je coins naar wilde sturen is niet gevonden",
                                    })
                                }
                            }
                        }

                    } else {
                        res.json({
                            "status": "error",
                            "message": "je balans is niet groot genoeg",
                        })
                    }
                }
            }

        });
    });

}


const getUser = (req, res) => {
    //console.log(req.user);

    User.find({
        "_id": req.user._id
    }, (err, docs) => {
        res.json({
            "status": "success user",
            "user": docs
        })
    })
}



const getAllUsers = (req, res) => {
    User.find({}, (err, docs) => {
        res.json({
            "status": "success all user",
            "users": docs
        })
    })
}






module.exports.getAllIncomingT = getAllIncomingT;
module.exports.getAllT = getAllT;
/*module.exports.getOneT= getOneT;*/
module.exports.createCoin = createCoin;
module.exports.getUser = getUser;
module.exports.getAllUsers = getAllUsers;
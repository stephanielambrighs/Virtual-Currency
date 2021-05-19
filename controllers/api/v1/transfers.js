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
function getOneT(req, res) {
    Transfer.findOne({ _id: req.params.id }, function (err, docs) {
        if (!err) {
            res.json({
                "status": "success transfer:id",
                "data": docs
            })
        }
    })

};

//voorwaarden om coins te kunnen/mogen sturen (had ook in het schema kunnen staan)
function createCoin(req, res) {


    let transfer = new Transfer();
    transfer.userFrom = req.user.fullname,
        transfer.coins = req.body.coins,
        transfer.reason = req.body.reason,
        transfer.description = req.body.description,
        transfer.userTo = req.body.userTo
        transfer.date = req.body.date;

    let newSenderCoins = req.user.coins - req.body.coins;

    // haal de data van de verzender en ontvager op
    User.find({ "fullname": req.user.fullname }, (err, docS) => {
        User.find({ "fullname": transfer.userTo }, (errR, docR) => {

            //check of de user bestaat
            if (docR[0] == null) {
                res.json({
                    "status": "error",
                    "message": "De user waar je coins naar wilde sturen is niet gevonden",
                })
            } else {
                // check of de user niet gelijk is aan de ontvanger
                if (docS[0].fullname == docR[0].fullname) {
                    res.json({
                        "status": "error",
                        "message": "je kan geen coins naar jezelf sturen",
                    })
                } else {
                    //check of er daadwerk coins verstuurd worden
                    if (docS[0].coins >= req.body.coins) {
                        if (transfer.coins == 0) {
                            res.json({
                                "status": "error",
                                "message": "je moet meer dan 0 coins per keer sturen.",
                            })
                        } else {
                            // check of er geen negatieve bedargen ingegeven worden
                            let coinSend = req.body.coins
                            if (coinSend < 0) {
                                res.json({
                                    "status": "error",
                                    "message": "je kan geen negatieve bedragen sturen!",
                                })
                            } else {
                                //verstuur de transfer naar de db
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
                                            console.log(doc);

                                        }
                                    })

                                    //update de user coins
                                    User.findOneAndUpdate({
                                        "fullname": req.user.fullname
                                    }, { coins: newSenderCoins }, (err, doc) => { })

                                    let oldReceiverCoins = docR[0].coins
                                    let newReceiverCoins = oldReceiverCoins + transfer.coins

                                    // update de sender coins
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





// requests openstellen
module.exports.getAllIncomingT = getAllIncomingT;
module.exports.getAllT = getAllT;
module.exports.getOneT = getOneT;
module.exports.createCoin = createCoin;
module.exports.getUser = getUser;
module.exports.getAllUsers = getAllUsers;
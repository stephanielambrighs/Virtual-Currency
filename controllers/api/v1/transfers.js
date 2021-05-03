const Transfer = require('../../../models/transfers');

// haal alle transfers op (nog sorteren op gebruiker)
function getAllT(req, res) {
    console.log(req.user);
   Transfer.find({
       "userTo":req.user.firstName +" " +req.user.lastName
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
   Transfer.findOne({ id: req.params.id }, function (err, docs) {
        if (!err) {
            res.json({
                "status": "success transfer:id",
                "data": docs
            })
        }
    })

};


//voorwaarden om coins te kunnen/mogen sturen nog toevoegen
function createCoin(req, res){
    let transfer = new Transfer();
    transfer.userFrom = req.user.firstName +" " +req.user.lastName,
    transfer.coins = req.body.coins,
    transfer.reason = req.body.reason,
    transfer.description = req.body.description,
    transfer.userTo = req.body.userTo

    transfer.save(function(err,result){
        if(!err){
            res.json(result);
            console.log(result);
        }
        else{
            res.send(err);
        }
    });

}



module.exports.getAllT = getAllT;
module.exports.getOneT= getOneT;
module.exports.createCoin = createCoin;
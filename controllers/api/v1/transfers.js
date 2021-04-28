const Transfer = require('../../../models/transfers');

// haal alle transfers op (nog sorteren op gebruiker aan de hand van user model)
function getAllT(req, res) {
   Transfer.find({}, function (err, docs) {
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
                "status": "success 1",
                "data": docs
            })
        }
    })

};



function createCoin(req, res){
    let transfer = new Transfer(req.body);

    transfer.save(function(err,result){
        if(!err){
            res.json(result);
        }
        else{
            res.send(err);
        }
    });

}



module.exports.getAllT = getAllT;
module.exports.getOneT= getOneT;
module.exports.createCoin = createCoin;
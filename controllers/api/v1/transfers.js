const Transfer = require('../../../models/transfers');

function getAll(req, res) {
   Transfer.find({}, function (err, docs) {
        if (!err) {
            res.json({
                "status": "success",
                "message": docs
            })
        } 
    });
}

function getOneT(req, res) {

   Transfer.find({ _id: req.params.id }, function (err, docs) {
        if (!err) {
            res.json({
                "status": "success 1",
                "message": docs
            })
        } 
    })

};


const create = (req, res) =>{
    let transfer = new Transfer();
    transfer.text = "transfer test";
    transfer.user = "jef";
    transfer.save((err, doc)=>{
        if(!err){
            res.json({
                "status": "succes",
                "data": {
                    "transfer": doc
                }
            });
        }else{
            res.json({
                "status": "fail",
                
            });
        }
       
    })
}

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.getOneT= getOneT;
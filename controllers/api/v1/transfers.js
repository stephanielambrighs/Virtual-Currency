const getAll = (req,res) =>{
    res.json({
        "status": "succes",
        "data": {
            "transfers": []
        }
    });
}

module.exports.getAll = getAll;
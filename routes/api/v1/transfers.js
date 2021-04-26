const express = require('express');
const router = express.Router();

router.get("/", (req,res) =>{
    res.json({
        "status": "succes",
        "data": {
            "transfers": []
        }
    });
})

router.post("/", (req,res) =>{
    res.json({
        "status" : "succes"
    });
})

module.exports = router;
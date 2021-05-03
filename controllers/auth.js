const User = require('../models/user');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
     let fullname = req.body.fullname;
    let username = req.body.username;
    let password = req.body.password;
    let coins = req.body.coins;

    const user = new User({
         fullname: fullname,
        username: username,
       coins: coins
    });

    await user.setPassword(password);
    await user.save().then(result =>{

        let token = jwt.sign({
            uid: result._id,
            username: result.username
        }, "MyVerySeceretWord")

        res.json({
            "status": "success",
           "data":{
                "token": token
            }
        })
    }).catch(error => {
        res.json({
            "status": "failed"
        })
    });


}

// has to filt in the correct username and password
const logIn = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        res.json({
            "status": "succes",
            "data": {
                "user": result
            }
        })
    }).catch(error => {
        res.json({
            "status" : "failed",
            "message": error
        })
    });
}


module.exports.signUp = signUp;
module.exports.logIn = logIn;
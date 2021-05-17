const User = require('../models/user');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
    let fullname = req.body.fullname;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let coins = req.body.coins;

    const user = new User({
        fullname: fullname,
        username: username,
        email: email,
        coins: coins
    });

    await user.setPassword(password);
    await user.save().then(result =>{

        //token aanmaken
        let token = jwt.sign({
            uid: result._id,
            username: result.username,
        }, "MyVerySecretWord");

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
//authenticate checkt of gehashed ww uit db overeenkomt met gehashed ingegeven ww
const logIn = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {

        // if result is not user
        if(!result.user){
            return res.json({
                "status": "failed",
                "message": "Login failed"
            })
        }

        let token = jwt.sign({
            uid: result.user._id,
            username: result.user.username,
        }, "MyVerySecretWord");

        return res.json({
            "status": "success",
            "data": {
                "token": token
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
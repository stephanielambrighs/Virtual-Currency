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
        console.log(result);

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

// has to fill in the correct username and password
const logIn = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        // verifyToken,(req, res) => {
        //     jwt.verify(req.token, 'MyVerySecretWord', (err , authData) => {
        //         if(err){
        //             res.sendStatus(403);
        //         }else{
        //             res.json({
        //                 message: "post created"
        //             });
        //         }
        //     });
        // }
        // if result is not a user
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


// function verifyToken(req, res, next){
//     const bearerHeader = req.headers['authorization'];

//     if(typeof bearerHeader !== 'undefined'){
//       const bearer = bearerHeader.split(' ');

//       const bearerToken = bearer[1];

//       req.token = bearerToken;

//       next();
//     }else{
//       res.sendStatus(403);
//     }
// }



module.exports.signUp = signUp;
module.exports.logIn = logIn;
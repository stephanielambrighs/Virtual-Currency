const User = require('../models/user');

const signUp = async (req, res, next) => {
    // let firstname = req.body.firstname;
    // let lastName = req.body.lastName;
    let username = req.body.username;
    let password = req.body.password;
    let coins = req.body.coins;

    const user = new User({
        // firstName: firstName,
        // lastName: lastName,
        username: username,
        coins: coins
    });
    await user.setPassword(password);
    await user.save().then(result =>{
        res.json({
            "status": "success"
        })
    }).catch(error => {
        res.json({
            "status": "failed"
        })
    });
}


module.exports.signUp = signUp;
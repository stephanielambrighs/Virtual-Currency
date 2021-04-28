const User = require('../models/user');

const signUp = async (req, res, next) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let password = req.body.password;
    let coins = req.body.coins;

    const user = new User({
        firstName: firstName,
        lastName: lastName,
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
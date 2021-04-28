const User = require('../models/user');

const signUp = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    const user = new User({
        username: username
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
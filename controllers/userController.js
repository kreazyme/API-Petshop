var User = require("../database/models/userModel")

exports.createUser = async (req, res, next) => {
    var user = new User({
        userName: req.body.username,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
    });
    user.save((error, result) => {
        res.send(result)
        next();
        if (error) {
            console.log("Error at user Controller: " + error);
            throw new Error(error)
        }
    })
}

exports.detailUser = async (req, res, next) => {
    const username = req.body.username;
    var user = await User.findOne({ userName: username })
    res.send(JSON.stringify(user))
}
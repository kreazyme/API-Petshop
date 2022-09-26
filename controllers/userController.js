var generator = require('generate-password');
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

exports.updateUser = async (req, res, next) => {
    var username = req.body.username;
    var id = await User.findOne({ userName: username })
    await User.findOneAndUpdate(
        {
            userName: username
        },
        {
            name: req.body.name,
            password: req.body.password,
            role: req.body.role,
        },
        {
            upsert: true
        })
    res.send("[]")
}

exports.forgotPassword = async (req, res, next) => {
    var username = req.body.username;
    var password = generator.generate({
        length: 10,
        numbers: true,
        lowercase: true,
    })
    await User.findOneAndUpdate(
        {
            userName: username
        },
        {
            password: password
        },
        {
            upsert: true
        })
    res.send(JSON.stringify(password))
}
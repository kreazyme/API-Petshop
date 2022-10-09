var generator = require('generate-password');
var User = require("../database/models/userModel");

const bcrypt = require("bcrypt")
const { generateToken } = require('../middlewares/authJWT');
const verifyToken = require("../middlewares/verifyJWT");
const createRefreshToken = require('../middlewares/refreshToken');

exports.createUser = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt)
    var user = new User({
        userName: req.body.username,
        name: req.body.name,
        password: password,
        role: req.body.role,
    });
    try {
        user.save((error, result) => {
            if (error) {
                res.status(422).json(error)
                console.log("Error at user Controller: " + error);
                throw new Error(error)
            }
            res.send(result)
            next();
        })
    }
    catch (error) {
        console.log("Error");
    }
}

exports.login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    var user = await User.findOne({ userName: username })
    const match = await bcrypt.compare(password, user.password)
    if (match) {
        const token = generateToken(user);
        const refreshToken = await createRefreshToken(user, res)
        res.send(JSON.stringify({ token, refreshToken }))
    }
    else {
        res.status(401).json({ status: false, description: "Wrong password or username" })
    }
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
    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password, salt)
    await User.findOneAndUpdate(
        {
            userName: username
        },
        {
            password: encryptPassword
        },
        {
            upsert: true
        })
    res.send(JSON.stringify(password))
}

exports.deleteUser = async (req, res, next) => {
    const username = req.body.username;
    var user = await User.findOne({ userName: username }).exec();
    if (!user) {
        res.status(400).json({ success: false, decription: "No user found!" })
    }
    else
        User.findOneAndDelete({ userName: username }).exec().then(() => {
            res.status(200).json({ success: true })
        }).catch((error) => {
            console.log("Error in delete usercontroller: " + error);
            res.status(500).json({ success: false })
        })
}
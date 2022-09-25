var User = require("../database/models/userModel")

exports.createUser = async (req, res, next) => {
    console.log(req.name);
    var user = new User({
        name: req.name,
        password: req.password,
        role: req.role,
        userId: req.id
    });
    try {
        user.save((error, result) => {
            res.send(result)
            next();
        })
    }
    catch (error) {
        console.log("Error when create userController: " + error);
        res.sendStatus(500)
    }
}
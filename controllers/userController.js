var User = require("../database/models/userModel")

exports.createUser = async (req, res, next) => {
    var user = new User({
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        userId: req.body.id
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
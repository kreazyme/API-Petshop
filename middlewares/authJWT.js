const jwt = require("jsonwebtoken")

exports.generateToken = (user) => {
    const access_token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            role: user.lole
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "1h"
        }
    )
    return access_token
}
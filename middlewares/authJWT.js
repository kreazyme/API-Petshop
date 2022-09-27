const jwt = require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) return res.sendStatus(401)

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }
    next();
}

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
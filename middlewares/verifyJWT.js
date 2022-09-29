var jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.sendStatus(401)
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decoded.id
        next('router')
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }
    next();
}
var jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req?.header('Authorization')
        if (!token || token === "") return res.sendStatus(401)
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decoded.id
        next()
    } catch (error) {
        console.log(error)
        res.send(500).json(error)
    }
}
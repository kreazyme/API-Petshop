var jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req?.header('Authorization')
        if (!token || token === "") return res.sendStatus(401)
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decoded.id
        next()
    } catch (error) {
        res.send(401).json(error);
        return;
    }
}
const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')

const authMe = async (req) => {
    try {
        const token = req.header("Authorization")
        if (!token) {
            return false
        }
        const user = jwt.decode(token);
        if (user.role === 0) {
            return false;
        }
        else {
            return user.id;
        }
    } catch (err) {
        throw err
    }
}

module.exports = authMe
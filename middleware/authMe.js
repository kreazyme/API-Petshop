const Users = require('../models/userModel')

const authMe = async () => {
    try {
        // Get user information by id
        const user = await Users.findOne({
            _id: req.user.id
        })
        return user.id  // Return user id
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = authMe
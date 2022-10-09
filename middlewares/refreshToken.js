const mongoose = require("mongoose")
const RefreshToken = require("../database/models/middlewares/refreshToken")
const jwt = require("jsonwebtoken");
const { saveRefreshToken } = require("../controllers/middleware/middlewareController");

const createRefreshToken = (async (user, res) => {
    const username = user.userName
    const refreshToken = await jwt.sign(
        {
            username: username,
            role: user.role,
            name: user.name
        },
        process.env.REFRESH_TOKEN_KEY,
        {
            expiresIn: "30d"
        }
    )
    saveRefreshToken(refreshToken, username, res);
    return refreshToken;
});

module.exports = createRefreshToken;
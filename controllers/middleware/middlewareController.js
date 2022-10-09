const RefreshToken = require("../../database/models/middlewares/refreshToken")

exports.saveRefreshToken = async (refreshToken, username, res) => {
    try {
        const newToken = RefreshToken({
            token: refreshToken,
            username: username
        })
        const token = await RefreshToken.findOne({ username: username });
        if (token) {
            await RefreshToken.findOneAndUpdate(
                {
                    username: username
                },
                {
                    username: username,
                    token: refreshToken
                },
                {
                    upsert: true
                }
            )
        }
        else {
            newToken.save()
        }
    } catch (err) {
        console.log(err)
    }
};
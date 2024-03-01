const { generateToken } = require("../middleware/authMiddleware");
const { usermodel } = require("../model/authModel");
const jwt = require('jsonwebtoken');



async function tokenController(req, res, next) {
    try {

        const { email, token } = req.body;
        if (!email && !token || email == '' || token == '') return res.status(204).json({ message: "token or email can't be null" });

        const refreshToken = req.body.token;
        if (refreshToken == null) return res.sendStatus(401);


        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if (err) return res.sendStatus(403);
            console.log(data);
            const accessToken = generateToken(data, process.env.ACCESS_TOKEN_SECRET, '3h');

            res.status(200).json({ accessToken: accessToken });
            next();
        })
    } catch (err) {
        next(err);
    }
}


module.exports = { tokenController }
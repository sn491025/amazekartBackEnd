const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function authenticationToken(req, res, next) {
    // console.log('jwwwtt');
    const authHeader = req.header('authorization');
    // console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    console.log(token, 'tokenssss');
    if (token == null || token == undefined) return res.status(401).send('Unauthorized');
    console.log(token, 'tokenenenene');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        console.log(data, 'jwt');
        if (err?.message != null) return res.status(403).json(err);
        // req.user = user
        next()
    })
}


const generateToken = (data, privateKey, expire) => jwt.sign(data, privateKey, { expiresIn: expire  }); 



module.exports = { authenticationToken, generateToken }
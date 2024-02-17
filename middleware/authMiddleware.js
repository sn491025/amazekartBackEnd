const jwt = require('jsonwebtoken');

function authenticationToken(req, res, next) {
    console.log('jwwwtt');
    const authHeader = req.header('authorization');
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    const token_string = JSON.parse(JSON.stringify(token));
    console.log(token, 'tokenssss');
    if (token_string == null || token_string == undefined) return res.status(401).send('Unauthorized');
    console.log(token, 'tokenenenene');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(user, 'jwt');
        if (err?.message != null) { return res.status(403).send('Token Expired'); }
        req.user = user
        next()
    })
}


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'});
}


module.exports = {authenticationToken, generateAccessToken}
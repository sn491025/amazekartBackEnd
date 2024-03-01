const { usermodel } = require('../model/authModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/authMiddleware');
const jwt  = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();


async function registerUser(req, res, next) {
    try {

        const { email, password } = req.body;
        console.log(password);

        // joi validation 
        // const { error, value } = authSchemaValidation.validateAsync(req.body);

        // express validation
        // const error = validationResult(req);
        // console.log(error);
        // if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });

        // console.log(error);
        // authSchemaValidation.validateAsync
        const doesExist = await usermodel.findOne({ email: email });
        if (doesExist) return res.status(409).json(`${email} is already been  registered`)

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        const user = new usermodel({ email, password: hashedPassword });
        const createUser = await user.save();
        res.status(201).json({ createUser });
    } catch (error) {
        next(error);
    }
}


async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        const error = validationResult(req);
        console.log(req.body);

        if (!error.isEmpty() || error === null) return res.status(400).json({ error: error.array()[0].msg || 'error' });

        const getUsers = await usermodel.findOne({ email: email });


        if (getUsers?.email == email && await bcrypt.compare(password, getUsers.password) || getUsers !== null) {

            const payload = { email: getUsers.email, password: getUsers.password }
            const access_token = generateToken(payload, process.env.ACCESS_TOKEN_SECRET, '60s');
            const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
            return res.status(200).json({
                access_token_secret: access_token,
                refresh_token_secret: refresh_token
            });
        } else { return res.status(401).json({ error: 'Please provide valid credentials OR create account by signUp' }); }

    } catch (err) {
        console.log(err, 'errors');
        next(err);
    }
}



module.exports = { registerUser, loginUser }
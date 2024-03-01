const Joi = require('joi');
const { body } = require('express-validator');


var authSchemaValidation = [
    body('email').isEmail().withMessage('invalid email').normalizeEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 6 characters')
];

// var authSchemaValidation = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).required(),
// })

module.exports = {
    authSchemaValidation
}
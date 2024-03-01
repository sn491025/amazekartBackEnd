const express = require('express');
const { authSchemaValidation } = require('../validation/auth_validation_schema');
const { registerUser, loginUser } = require('../controller/auth_controller');
const router = express.Router();


router.route('/register').post(authSchemaValidation, registerUser)

router.route('/login').post(authSchemaValidation, loginUser)


module.exports = router;
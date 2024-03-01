const express = require('express');
const { tokenController } = require('../controller/token_controller');
const router = express.Router();



router.route('/').post(tokenController);





module.exports = router;
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const httpError = require('http-errors');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { decrypt } = require('dotenv');
const { invalid } = require('joi');

// models 
const ProductModel = require('./model/productModel');
const { usermodel } = require('./model/authModel');
const { authSchemaValidation } = require('./validation/auth_validation_schema');

// middleware
const { generateToken, authenticationToken } = require('./middleware/authMiddleware');

require('./helpers/mongo_init');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(errors.errorHandler);

app.use('/product', require('./routes/get_products_route'));

app.use('/auth', require('./routes/auth_route'));
app.use('/token', require('./routes/token_route'));

app.listen(port, () => {
    console.log(`listening on ${port}`);
});






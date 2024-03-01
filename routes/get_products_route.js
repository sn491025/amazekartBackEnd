const express = require('express');
const router = express.Router();
const { authenticationToken } = require('../middleware/authMiddleware');
const { getAllProduct, getProductById, createProduct, updateProduct, delectProduct } = require('../controller/product_controller');

router.use(authenticationToken);

router.route('/').get(getAllProduct);
router.route('/create').post(createProduct);
router.route('/:id').get(getProductById).patch(updateProduct).delete(delectProduct);

module.exports = router;

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const checkAuth = require('../middleware/check-auth');

router.get('/',ProductController.get_products)

router.post('/',checkAuth,ProductController.post_products)

module.exports = router;
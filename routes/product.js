const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');

router.get('/',ProductController.get_products)

router.post('/',ProductController.post_products)

module.exports = router;
const express = require('express');
const router = express.Router();
const PurchaseController = require('../controllers/purchase');

router.get('/',PurchaseController.get_products)

router.post('/:userId',PurchaseController.post_products)

module.exports = router;
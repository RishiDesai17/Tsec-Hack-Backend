const express = require('express');
const router = express.Router();
const PurchaseController = require('../controllers/purchase');
const checkAuth = require('../middleware/check-auth');

router.get('/',checkAuth,PurchaseController.get_purchases)

router.post('/:userId',checkAuth,PurchaseController.post_purchase)

module.exports = router;
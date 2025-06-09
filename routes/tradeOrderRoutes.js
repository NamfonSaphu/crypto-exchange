const express = require('express');
const router = express.Router();
const tradeOrderController = require('../controllers/tradeOrderController');

router.post('/', tradeOrderController.createOrder);

router.get('/', tradeOrderController.getAllOrders);

router.get('/user/:userId', tradeOrderController.getOrdersByUserId);

router.put('/:orderId/status', tradeOrderController.updateOrderStatus);

module.exports = router;

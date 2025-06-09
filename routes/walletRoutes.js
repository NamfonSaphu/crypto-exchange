const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.post('/', walletController.createWallet);

router.get('/user/:userId', walletController.getWalletsByUserId);

router.put('/:walletId/balance', walletController.updateBalance);

router.delete('/:walletId', walletController.deleteWallet);

module.exports = router;

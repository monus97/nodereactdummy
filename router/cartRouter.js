const express = require('express')
const router = express.Router();
const cart = require('../controller/cartController');
const {verifyToken} = require('../authMiddleWare/authMiddleware')

router.post('/addtocart',verifyToken,cart.createCart)
router.post('/removetocart',verifyToken,cart.removeItemsFromCart)
router.get('/cartDetails',verifyToken,cart.getCart)

module.exports = router;
const express = require('express')
const router = express.Router();
const item = require('../controller/itemControlller')
const {upload} = require('../imageMiddleWare/image')
const {verifyToken} = require('../authMiddleWare/authMiddleware')
const {restrictTo} = require('../authMiddleWare/authMiddleware')

router.route("/item")
.post(upload.single('images'),verifyToken,restrictTo('admin'),item.addItem,)
.get(item.getAllItem)

router.route('/item/:id')
.get(item.getItemById)
.delete(verifyToken,restrictTo('admin'),item.deleteItem)
.put(upload.single('images'),verifyToken,restrictTo('admin'),item.updateItem)
router

router.get('/search/:itemName',item.searchProduct)
module.exports = router;
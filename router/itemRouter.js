const express = require('express')
const router = express.Router();
const item = require('../controller/itemControlller')
const {upload} = require('../imageMiddleWare/image')

router.route("/item")
.post(upload.single('images'),item.addItem,)
.get(item.getAllItem)

router.route('/item/:id')
.get(item.getItemById)
.delete(item.deleteItem)
.put(upload.single('images'),item.updateItem)
router

router.get('/search/:itemName',item.searchProduct)
module.exports = router;
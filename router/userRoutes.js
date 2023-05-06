const express = require('express')
const router = express.Router()
const user  = require('../controller/userController')


router.post('/register',user.userRegister)
router.get('/details',user.getUser)
router.delete('/delete/:id',user.UserDelete)

module.exports = router;
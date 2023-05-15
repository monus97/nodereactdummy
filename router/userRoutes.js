const express = require('express')
const router = express.Router()
const user  = require('../controller/userController')


router.post('/register',user.userRegister)
router.post('/login',user.userLogin)
router.get('/details',user.getUser)
router.get('/details/:id',user.getUserById)
router.delete('/userdelete/:id',user.UserDelete)
router.put('/update/:id',user.updateUser)

module.exports = router;
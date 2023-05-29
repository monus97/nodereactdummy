const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const { verifyToken } = require("../authMiddleWare/authMiddleware");
const { restrictTo } = require("../authMiddleWare/authMiddleware");
const { upload } = require("../imageMiddleWare/image");

router.post("/register", upload.single("profilePic"), user.userRegister);
router.post("/login", user.userLogin);
router.get("/details", user.getUser);
router.get("/details/:id", user.getUserById);
router.delete("/userdelete/:id", user.UserDelete);
router.put("/update/:id",upload.single('profilePic'), user.updateUser);
router.post('/verifyOtp',user.verifyOtp)
router.post('/resendOtp',user.resendOtp)

module.exports = router;

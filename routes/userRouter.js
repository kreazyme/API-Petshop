var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
router.use(express.json())

router.post('/signin', userController.createUser);

router.get("/detailuser", userController.detailUser)

router.get("/updateuser", userController.updateUser)

router.get("/forgotpassword", userController.forgotPassword)

router.get("/login", userController.login)

router.delete("/deleteaccout", userController.deleteUser)

module.exports = router;
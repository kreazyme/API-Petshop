var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
router.use(express.json())

router.post('/signin', userController.createUser);

router.get("/login", userController.detailUser)

router.get("/updateuser", userController.updateUser)

router.delete("/deleteaccout", userController.deleteUser)

module.exports = router;
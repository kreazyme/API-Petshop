var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");
const verifyJWT = require("../middlewares/verifyJWT");
// const verifyToken = require("../middlewares/verifyJWT");

router.use(express.json())
// router.use(verifyToken)

router.post('/signin', userController.createUser);

router.route("/detail").get(verifyJWT, userController.detailUser)

router.route("/updateuser").get(verifyJWT, userController.updateUser)

router.get("/forgotpassword", userController.forgotPassword)

router.get("/login", userController.login)

router.route("/deleteaccout").get(verifyJWT, userController.deleteUser)

module.exports = router;
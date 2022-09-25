var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.post('/signin', userController.createUser);

module.exports = router;
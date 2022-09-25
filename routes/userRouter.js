var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
router.use(express.json())

router.get('/signin', userController.createUser);

module.exports = router;
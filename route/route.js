var express = require("express");
var router = express.Router();
var controller = require("../controller/users.controller");

router.post("/login", controller.login);
router.get("/", controller.z);
router.post("/checkToken", controller.check);
router.post("/create", controller.create);

module.exports = router;

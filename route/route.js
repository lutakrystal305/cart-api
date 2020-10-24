var express = require("express");
var router = express.Router();
var controller = require("../controller/users.controller");

router.post("/login", controller.login);

router.post("/checkToken", controller.check);
router.post("/create", controller.create);
router.post("/updatePhone", controller.updatePhone);
router.post("/updateEmail", controller.updateEmail);
router.post("/updateDate", controller.updateDate);
router.post("/updateUni", controller.updateUni);
router.post("/updateAdd", controller.updateAdd);
router.post('/rate', controller.rate);
router.get('/getUsers', controller.getUsers);


module.exports = router;

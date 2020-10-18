var express= require('express');
var router= express.Router();
var controller= require('../controller/cart.controller');
var controller1 = require('../controller/history.controller');

router.post('/', controller.index);
router.get('/:id', controller1.history);


module.exports = router;




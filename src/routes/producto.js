'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');

var router = express.Router();

router.get('/productos', ProductoController.list);
router.get('/productos/:id', ProductoController.find);
router.post('/productos/save', ProductoController.save);


module.exports = router;
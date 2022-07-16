'use strict'

var express = require('express');
const { model } = require('mongoose');

var PagoController = require('../controllers/pago');

var router = express.Router();

// RUTAS PARA PRODUCTOS
router.get('/pago', PagoController.list);
router.get('/pago/:id', PagoController.find);
router.post('/pago/save', PagoController.save);



// EXPORTAR RUTA
module.exports = router;
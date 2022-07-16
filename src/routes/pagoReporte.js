'use strict'
var express = require('express');
const { model} = require('mongoose');

var PagoReporteController = require('../controllers/pagoReporte');

var router = express.Router();

//RUTA DE LOS PRODUCTOS CATEGORIA
router.get('/reportes/pagoReport', PagoReporteController.pagoreport);

//EXPORTAR RUTA
module.exports = router;
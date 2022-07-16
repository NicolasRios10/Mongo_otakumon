'use strict'
var express = require('express');
const { model} = require('mongoose');

var PagoReporteController = require('../controllers/pago_reporte');

var router = express.Router();

//RUTA DE LOS PRODUCTOS CATEGORIA
router.get('/reportes/pago_Report', PagoReporteController.pagoreport);

//EXPORTAR RUTA
module.exports = router;
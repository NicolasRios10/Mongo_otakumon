'use strict'

var express = require("express");
const { model } = require('mongoose');


var ReporteController = require('../controller/reporte');

var router = express.Router();

//ruta de lo productos por categoria
router.get('/reportes/productosReport',ReporteController.productoReport);

//exportar ruta
module.exports = router
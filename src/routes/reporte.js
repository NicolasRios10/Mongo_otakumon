'use strict'

var express = require("express");
const {
    model
} = require('mongoose');


var ReporteController = require('../controllers/reporte');

var router = express.Router();

//ruta de lo productos por categoria
router.get('/reportes/productosReport', ReporteController.productosReport);

//exportar ruta
module.exports = router
'use strict'

var express = require('express');
const { model } = require('mongoose');


var ProductoController = require('../controllers/usuario');

var router = express.Router();

// RUTAS PARA PRODUCTOS
router.get('/usuarios', ProductoController.list);
router.get('/usuarios/:id', ProductoController.find);
router.post('/usuarios/save', ProductoController.save);
// Delete Prueba 12
// router.delete('/productos/delete/:id', ProductoController.deleteOne);


// EXPORTAR RUTA
module.exports = router;
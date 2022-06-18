'use strict'

var express = require('express');
const { model } = require('mongoose');


var clienteController = require('../controllers/cliente');

var router = express.Router();

// RUTAS PARA clienteS
router.get('/clientes', clienteController.list);
router.get('/clientes/:id', clienteController.find);
router.post('/clientes/save', clienteController.save);
router.delete('/clientes/:id', clienteController.deleteOne);


// EXPORTAR RUTA
module.exports = router;
'use strict'

var express = require('express');
const {
    model
} = require('mongoose');
var PublicacionesController = require('../controllers/publicaciones');

var router = express.Router();

// RUTAS PARA PUBLICACIONES
router.get('/publicaciones', PublicacionesController.list);
router.get('/publicaciones/:id', PublicacionesController.find);
router.post('/publicaciones/save', PublicacionesController.save);



module.exports = router;
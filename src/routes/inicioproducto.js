'use strict'

var express = require('express');
const {
    model
} = require('mongoose');
var InicioproductoController = require('../controllers/inicioproducto');

var router = express.Router();

// RUTAS PARA INICIOPRODUCTO
router.get('/inicioproducto', InicioproductoController.list);
router.get('/inicioproducto/:id', InicioproductoController.find);
router.post('/inicioproducto/save', InicioproductoController.save);



module.exports = router;
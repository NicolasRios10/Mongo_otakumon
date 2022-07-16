'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//CARGA DE ARCHIVOS DE RUTA
var producto_routes = require('./routes/producto');
var publicaciones_routes = require('./routes/publicaciones');
var cliente_routes = require('./routes/cliente');
var usuario_routes = require('./routes/usuario');
var reporte_routes = require('./routes/reporte');
var inicioproducto_routes = require('./routes/inicioproducto');
var pago_routes = require('./routes/pago');
//var pago_reporte_routes = require('./routes/pagoReporte');



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//REESCRIBIR RUTAS
app.use('/api', producto_routes);
// http://localhost:9000/api/productos                  GET
// http://localhost:9000/api/productos /1                GET
// http://localhost:9000/api/productos /save             POST

// http://192.168.3.63:9000/api/productos                   GET

app.use('/api', publicaciones_routes);
// http://localhost:9000/api/publicaciones                  GET
// http://localhost:9000/api/publicaciones/1                GET
// http://localhost:9000/api/publicaciones/save             POST

// http://192.168.3.63:9000/api/publicaciones                  GET

app.use('/api', cliente_routes);
app.use('/api', usuario_routes);
app.use('/api', reporte_routes);
app.use('/api', inicioproducto_routes);
app.use('/api', pago_routes);
//app.use('/api', pago_reporte_routes);


//EXPORTAR MODULO
module.exports = app;
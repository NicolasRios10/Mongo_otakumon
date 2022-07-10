'use strict'

var client = require("../database/db");
var db = client.db("pruebasbd");

var controller = {
    // LISTAR
    list: function (req, res) {
        console.log("--------------------------------");
        console.log("Entrando a la funcion 'listar'");
        db.collection("inicioproducto").find().toArray(
            (error, dataInicioProducto) => {
                if (error || !dataInicioProducto) {
                    return res.status(404).send({
                        message: "No se encontraron productos en la pantalla de inicio"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        inicioproducto: dataInicioProducto
                    });
                }
            }
        );
    },

    // BUSCAR
    find: function (req, res) {
        console.log("--------------------------------");
        console.log("Entrando a la funcion 'encontrar'");
        db.collection("inicioproducto").find({
            inicioproductoId: parseInt(req.params.id)
        }).toArray(
            (error, dataInicioProducto) => {
                if (error || !dataInicioProducto) {
                    return res.status(404).send({
                        message: "No se encontro el producto en la pantalla de inicio"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        inicioproducto: dataInicioProducto[0]
                    });
                }
            }
        );

    },

    // GUARDAR
    save: function (req, res) {
        console.log("--------------------------------");
        console.log("Entrando a la funcion 'guardar'");
        console.log(req.body);
        if (req.body.inicioproductoId == "0") {
            // NUEVO
            db.collection("inicioproducto").count().then(
                countInicioProducto => {
                    var inicioproducto = {}
                    inicioproducto.inicioproductoId = countInicioProducto + 1;
                    inicioproducto.titulo = req.body.titulo;
                    inicioproducto.descripcion = req.body.descripcion;
                    inicioproducto.imagen = req.body.imagen;
                    inicioproducto.precio = req.body.precio;
                    db.collection("inicioproducto").insertOne(inicioproducto, (error, result) => {
                        if (error) {
                            return res.status(404).send({
                                message: "No se pudo registrar el producto en la pantalla de inicio"
                            });
                        } else {
                            return res.status(200).send({
                                status: "success",
                                inicioproducto: result
                            });
                        }
                    });
                }
            );
        } else {
            console.log("Entrando a la funcion 'editar'");
            var inicioproducto = {}
            inicioproducto.inicioproductoId = parseInt(req.body.inicioproductoId);
            inicioproducto.titulo = req.body.titulo;
            inicioproducto.descripcion = req.body.descripcion;
            inicioproducto.imagen = req.body.imagen;
            inicioproducto.precio = req.body.precio;
            console.log(inicioproducto);
            db.collection("inicioproducto").updateOne({
                inicioproductoId: {
                    $eq: parseInt(req.body.inicioproductoId)
                }
            }, {
                $set: inicioproducto
            }, (error, result) => {
                if (error) {
                    return res.status(404).send({
                        message: "No se pudo editar el producto en la pantalla de inicio"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        inicioproducto: result
                    });
                }
            })
        }
    },
};
module.exports = controller
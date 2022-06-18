'use strict'

var client = require("../database/db");
var db = client.db("pruebasbd");

var controller = {
    // LISTAR
    list: function (req, res) {
        console.log("--------------------------------");
        console.log("Entrando a la funcion 'listar'");
        db.collection("publicaciones").find().toArray(
            (error, dataPublicaciones) => {
                if (error || !dataPublicaciones) {
                    return res.status(404).send({
                        message: "No se encontraron publicaciones"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        publicaciones: dataPublicaciones
                    });
                }
            }
        );
    },

    // BUSCAR
    find: function (req, res) {
        console.log("--------------------------------");
        console.log("Entrando a la funcion 'encontrar'");
        db.collection("publicaciones").find({
            publicacionId: parseInt(req.params.id)
        }).toArray(
            (error, dataPublicaciones) => {
                if (error || !dataPublicaciones) {
                    return res.status(404).send({
                        message: "No se encontro la publicación"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        publicaciones: dataPublicaciones[0]
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
        if (req.body.publicacionId == "0") {
            // NUEVO
            db.collection("publicaciones").count().then(
                countPublicaciones => {
                    var publicacion = {}
                    publicacion.publicacionId = countPublicaciones + 1;
                    publicacion.usuario123 = req.body.usuario123;

                    publicacion.descripcion = req.body.descripcion;
                    db.collection("publicaciones").insertOne(publicacion, (error, result) => {
                        if (error) {
                            return res.status(404).send({
                                message: "No se pudo registrar la publicacion"
                            });
                        } else {
                            return res.status(200).send({
                                status: "success",
                                publicacion: result
                            });
                        }
                    });
                }
            );
        } else {
            console.log("Entrando a la funcion 'editar'");
            var publicacion = {}
            publicacion.publicacionId = parseInt(req.body.publicacionId);
            publicacion.descripcion = req.body.descripcion;
            publicacion.usuario123 = req.body.usuario123;

            console.log(publicacion);
            db.collection("publicaciones").updateOne({
                publicacionId: {
                    $eq: parseInt(req.body.publicacionId)
                }
            }, {
                $set: publicacion
            }, (error, result) => {
                if (error) {
                    return res.status(404).send({
                        message: "No se pudo editar la publicacion"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        publicacion: result
                    });
                }
            })
        }
    },
};
module.exports = controller
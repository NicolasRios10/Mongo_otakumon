'use strict'

const { model } = require("mongoose");
const { router } = require("../app");
const app = require("../app");
var client = require("../database/db");
var db = client.db("pruebasbd"); // NOMBRE DE LA BASE DE DATOS

var controller = {

    // LISTAR
    list: function(req, res) {
        console.log("-------------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");
        db.collection("usuarios").find().toArray(
            (error, dataUsuarios) => {
                if (error || !dataUsuarios) {
                    return res.status(404).send({
                        message: "No se encontraron usuarios"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        Usuarios: dataUsuarios
                    });
                }
            }
        );
    },
    // BUSCAR
    find: function(req, res) {
        console.log("-------------------");
        console.log("ENTRANDO A LA FUNCION FIND");
        console.log("id:" + req.params.id);
        db.collection("usuarios").find({ usuarioId: parseInt(req.params.id) }).toArray(
            (error, dataUsuarios) => {
                if (error || !dataUsuarios) {
                    return res.status(404).send({
                        message: "No se encontro el usuarios"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        usuario: dataUsuarios[0]
                    });
                }
            }
        );
    },
    // GUARDAR
    save: function(req, res) {
        console.log("-------------------");
        console.log("ENTRANDO A LA FUNCION SAVE");
        console.log(req.body);
        if (req.body.usuarioId == "0") { // SI ES NUEVO
            console.log("ENTRANDO A NUEVO");
            db.collection("usuarios").count().then(
                countUsuarios => {
                    var usuario = {}
                    usuario.usuarioId = countUsuarios + 1;
                    usuario.nombreCompleto = req.body.nombreCompleto;
                    usuario.apellidos = req.body.apellidos;
                    usuario.email = req.body.email;
                    usuario.password = req.body.password;
                    db.collection('usuarios').insertOne(usuario,
                        (error, result) => {
                            if (error) {
                                return res.status(404).send({
                                    message: "No se pudo registrar el usuario"
                                });
                            } else {
                                return res.status(200).send({
                                    message: "success",
                                    usuario: result
                                });
                            }
                        }
                    );
                }
            );
            //EDITAR
        } else {
            console.log("ENTRANDO A EDITAR");
            var usuario = {}
            usuario.usuarioId = parseInt(req.body.usuarioId);
            usuario.nombreCompleto = req.body.nombreCompleto;
            usuario.apellidos = req.body.apellidos;
            usuario.email = req.body.email;
            usuario.password = req.body.password;
            console.log(usuario);
            db.collection("usuarios").updateOne({
                    usuarioId: { $eq: parseInt(req.body.usuarioId) }
                }, { $set: usuario },
                (error, result) => {
                    if (error) {
                        return res.status(404).send({
                            message: "No se pudo editar el usuario"
                        });
                    } else {
                        return res.status(200).send({
                            message: "success",
                            usuario: result
                        });
                    }
                }

            );
        }
    },
    //  DELETE  
    // app.delete('/api/productos/:productoId', (req, res) => {
    //     let productoId = req.params.productoId
    //     pro
    // })
    // find: function(req, res) {
    //     console.log("-------------------");
    //     console.log("ENTRANDO A LA FUNCION ELIMINAR");
    //     // console.log(req.res);
    //     // console.log("id:" + req.params.id);
    //     // producto.productoId = parseInt(req.body.productoId);

    //     const productoId = req.params;
    //     // db.collection("productoId").delete({ productId: parseInt(req.params.id) })
    //     // await db.productos.delete({
    //     //     where: {
    //     //         id,
    //     //     },
    //     // });
    //     // model.deleteOne({ _productoId: parseInt(productoId) }, )
    //     router.delete("api/productos/productoId", (req, res) => {
    //         userschema
    //             .remove({ _productoId: productoId })
    //             .then((data) => res.status(200).send("PRODUCTO ELIMINADO"))
    //             .catch((error) => res.status(404).send("NO SE ELIMINO EL PRODUCTO"));
    //     });
    // }
    deleteOne: function(req, res) {
        console.log("-------------------");
        console.log("ENTRANDO A LA FUNCION ELIMINAR");
        console.log("id:" + req.params.id);
        db.collection("usuarios").deleteOne({
                usuarioId: { $eq: parseInt(req.body.usuarioId) }
            },
            (error, dataUsuarios) => {
                if (error || !dataUsuarios) {
                    return res.status(404).send({
                        message: "No se elimino usuarios"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        usuarios: dataUsuarios
                    });
                }
            });
    },

}
module.exports = router;
module.exports = controller;
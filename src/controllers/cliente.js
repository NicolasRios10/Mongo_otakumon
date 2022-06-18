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
        db.collection("clientes").find().toArray(
            (error, dataClientes) => {
                if (error || !dataClientes) {
                    return res.status(404).send({
                        message: "No se encontraron clientes"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        Clientes: dataClientes
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
        db.collection("clientes").find({ clienteId: parseInt(req.params.id) }).toArray(
            (error, dataClientes) => {
                if (error || !dataClientes) {
                    return res.status(404).send({
                        message: "No se encontro el clientes"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        cliente: dataClientes[0]
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
        if (req.body.clienteId == "0") { // SI ES NUEVO
            console.log("ENTRANDO A NUEVO");
            db.collection("clientes").count().then(

                countClientes => {
                    var cliente = {}
                    cliente.clienteId = countClientes + 1;
                    cliente.nombreCompleto = req.body.nombreCompleto;
                    cliente.apellidos = req.body.apellidos;
                    db.collection('clientes').insertOne(cliente,
                        (error, result) => {
                            if (error) {
                                return res.status(404).send({
                                    message: "No se pudo registrar el cliente"
                                });
                            } else {
                                return res.status(200).send({
                                    message: "success",
                                    cliente: result
                                });
                            }
                        }
                    );
                }
            );
            //EDITAR
        } else {
            console.log("ENTRANDO A EDITAR");
            var cliente = {}
            cliente.clienteId = parseInt(req.body.clienteId);
            cliente.nombreCompleto = req.body.nombreCompleto;
            cliente.apellidos = req.body.apellidos;
            console.log(cliente);
            db.collection("clientes").updateOne({
                    clienteId: { $eq: parseInt(req.body.clienteId) }
                }, { $set: cliente },
                (error, result) => {
                    if (error) {
                        return res.status(404).send({
                            message: "No se pudo editar el cliente"
                        });
                    } else {
                        return res.status(200).send({
                            message: "success",
                            cliente: result
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
        db.collection("clientes").deleteOne({
                clienteId: { $eq: parseInt(req.body.clienteId) }
            },
            (error, dataClientes) => {
                if (error || !dataClientes) {
                    return res.status(404).send({
                        message: "No se elimino clientes"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        clientes: dataClientes
                    });
                }
            });
    },

}
module.exports = router;
module.exports = controller;
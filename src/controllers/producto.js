'use strict'

var client = require("../database/db");
var db = client.db("pruebasbd");

var controller = {
    //lista
    list: function (req, res) {
        console.log("-------------------------------");
        console.log("ENTRANDO A FUNCION LISTAR");
        db.collection("producto").find().toArray(
            (error, dataProductos) => {
                if (error || !dataProductos) {
                    return res.status(404).send({
                        message: "no se encuentran productos"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        productos: dataProductos
                    })
                }
            }
        );
    },

    //BUSCAR
    find: function (req, res) {
        console.log("-------------------------------");
        console.log("ENTRANDO A FUNCION BUSCAR-FIND");
        db.collection("productos").find({ productoID: parseInt(req.params.id) }).toArray(
            (error, dataProductos) => {
                if (error || !dataProductos) {
                    return res.status(404).send({
                        message: "no se encuentro el producto"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        producto: dataProductos[0]
                    })
                }
            }
        )
    },


    //GUARDAR
    save: function (req, res) {
        console.log("-------------------------------");
        console.log("ENTRANDO A FUNCION GUARDAR-SAVE");
        console.log(req.body);
        if (req.body.productoID == 0) {//NUEVO
            db.collection("productos").count().then(
                countProductos => {
                    var producto = {}
                    producto.productoID = countProductos + 1;
                    producto.descripcion = req.body.descripcion;
                    producto.precio = req.body.precio;
                    producto.imagen = req.body.imagen;
                    producto.categoria = req.body.categoria;
                    producto.estado = req.body.estado;
                    db.collection("productos").insertOne(producto,
                        (error, result) => {
                            if (error) {
                                return res.status(404).send({
                                    message: "no se pudo registrar el producto"
                                });
                            }else{
                                return res.status(200).send({
                                    status: "success",
                                    producto: result
                                })
                            }
                        }
                    );
                }
            )
        }else{
            console.log("ENTRANDO A EDITAR");
            var producto = {}
            producto.productoID = parseInt(req.body.productoID);
            producto.descripcion = req.body.descripcion;
            producto.precio = req.body.precio;
            producto.imagen = req.body.imagen;
            producto.categoria = req.body.categoria;
            producto.estado = req.body.estado;
            console.log(producto);
            db.collection("producto").updateOne({productoID: {$eq: parseInt(req.body.productoID)}},
                                                {$set: producto},
                                                (error, result) => {
                                                    if (error) {
                                                        return res.status(404).send({
                                                            message: "no se pudo editar el producto"
                                                        });
                                                    }else{
                                                        return res.status(200).send({
                                                            status: "success",
                                                            producto: result
                                                        })
                                                    }
                                                }
            );
        }
    }



};

module.exports = controller;
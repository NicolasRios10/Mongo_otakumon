'use strict'

var client = require("../database/db");
var db = client.db("pruebasbd");

var controller = {
    //lista
    list: function (req, res) {
        console.log("-------------------------------");
        console.log("ENTRANDO A FUNCION LISTAR");
        db.collection("pago").find().toArray(
            (error, dataPago) => {
                if (error || !dataPago) {
                    return res.status(404).send({
                        message: "no se encuentran pago"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        pago: dataPago
                    })
                }
            }
        );
    },

    //BUSCAR
    find: function (req, res) {
        console.log("-------------------------------");
        console.log("ENTRANDO A FUNCION BUSCAR-FIND");
        db.collection("pago").find({ pagoID: parseInt(req.params.id) }).toArray(
            (error, dataPago) => {
                if (error || !dataPago) {
                    return res.status(404).send({
                        message: "no se encuentro el pago"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        pago: dataPago[0]
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
        if (req.body.pagoID == 0) {//NUEVO
            db.collection("pago").count().then(
                countPago => {
                    var pago = {}
                    pago.pagoID = countPago + 1;
                    pago.numero = req.body.numero;
                    pago.cvc = req.body.cvc;
                    pago.caducidad = req.body.caducidad;
                    pago.contraseña = req.body.contraseña;
                    pago.titulo = req.body.titulo;
                    db.collection("pago").insertOne(pago,
                        (error, result) => {
                            if (error) {
                                return res.status(404).send({
                                    message: "no se pudo registrar el pago"
                                });
                            }else{
                                return res.status(200).send({
                                    status: "success",
                                    pago: result
                                })
                            }
                        }
                    );
                }
            )
        }else{
            console.log("ENTRANDO A EDITAR");
            var pago = {}
            pago.pagoID = countPago + 1;
                    pago.numero = req.body.numero;
                    pago.cvc = req.body.cvc;
                    pago.caducidad = req.body.caducidad;
                    pago.contraseña = req.body.contraseña;
                    pago.titulo = req.body.titulo;
            console.log(pago);
            db.collection("pago").updateOne({pagoID: {$eq: parseInt(req.body.pagoID)}},
                                                {$set: pago},
                                                (error, result) => {
                                                    if (error) {
                                                        return res.status(404).send({
                                                            message: "no se pudo editar el pago"
                                                        });
                                                    }else{
                                                        return res.status(200).send({
                                                            status: "success",
                                                            pago: result
                                                        })
                                                    }
                                                }
            );
        }
    }



};

module.exports = controller;
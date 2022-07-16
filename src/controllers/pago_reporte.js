'use strict'

var pago = require("../database/db");
var db = pago.db("pruebasdb");

var controller ={


pagoreport: function(req,res){
    console.log("-------");
    console.log("ENTRANDO A LA FUNCION pagoReport");
    db.collection("pago").aggregate([
        {$group: {_id:"$genero",count: { $sun:1}}}.toArray(
            (error, datapagobygenero) =>{
                if (error||datapagobygenero){
                return res.status(404).send({
                    message:"No se encontraron pagos"
                })
            }else{
                return res.status(200).send({
                    status:"success",
                    pagoReport:datapagobygenero,
                });
            }
        }
        ),
    ])
}
}

'use strict'

var client = require("../database/db");
var db = client.db("pruebasbd");
// reportedeproductojs
//copiatodoycambiaelnombre
var controller = {

    //reporte de totsl de productos agrupados
    productosReport:function(req,res){
        console.log("____________________");
        console.log("ENTRANDO A LA FUNCION productosReport");
        db.collection("productos").aggregate([
            {$group:{_id:"$Precio",count: {$sum:1}}}
        ]).toArray(
            (error,dataProductosByPrecio) =>{
                if(error || !dataProductosByPrecio){
                    return res.status(404).send({
                        message:"No se encontraron productos"
                    })
                }else{
                    return res.status(200).send({
                        status:"success",
                        productosReport: dataProductosByPrecio
                    });
                }
            }
        );
    }

}
module.exports = controller;
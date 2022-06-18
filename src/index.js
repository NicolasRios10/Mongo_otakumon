'use strict'

const { append } = require("express/lib/response");
const mongoose = require("mongoose");
var app = require('./app');
// señalando el puerto establecido
const port = process.env.PORT || 9000;

mongoose.Promise = global.Promise;

// para poder usar el archivo .env
require("dotenv").config();

//routes si responde y pregunta
/*app.get("/", (req, res) => {
    res.send("welcome to my API posdt:si funciona")
  });*/

//mongodb conection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser:true}).then( 
  () => {console.log('la coneccion a la bd es correcta ')
        //crear el servidor
}
).catch(error => console.log(error));

//escuchar el puerto
app.listen(port, () => console.log('server listening on port ', port, 'si funciona xd'));
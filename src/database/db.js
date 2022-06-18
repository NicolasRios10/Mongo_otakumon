const { MongoClient} = require("mongodb");
const { response } = require("../app");
require("dotenv").config();
const client = new MongoClient(process.env.MONGODB_URI);

client.connect().then(
    (response) => {
        console.log('la coneccion de bd es correcta -url: ', response.url);
    },
    (error) => {
        console.log('error: ', error)
    }
);

module.exports = client;
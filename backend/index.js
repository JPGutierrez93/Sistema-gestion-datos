'use strict'

var mongoose = require('mongoose');
var app = require ('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sistema-gestion')
    .then(()=>{
        console.log('Conexión a la base de datos establecida con éxito');

        //create server
        app.listen(port, ()=>{
            console.log('Servidor corriendo correctamente en la url: localhost:3700')
        });
    })
    .catch(err=> console.log(err));
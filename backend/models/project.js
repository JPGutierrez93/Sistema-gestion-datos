'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    fecha_carga: {type: Date, default: Date.now},
    nombre: {type: String, required:true},
    apellido: {type: String, required:true},
    dni: {type: Number, required:true},
    nacimiento: {type: String, required:true},
    domicilio: {type: String, required:true},
    mail: {type: String, required:true},
    comentario: {type: String, required:false}
});

module.exports = mongoose.model('Project', ProjectSchema);
'use strict'

var Data = require ('../models/data');

var controller = {
    
    saveData: function(req,res){
                  
        var data = new Data();

        var params = req.body;
        data.nombre = params.nombre;
        data.apellido = params.apellido;
        data.dni = params.dni;
        data.nacimiento = params.nacimiento;
        data.domicilio = params.domicilio;
        data.mail = params.mail;
        data.comentario = params.comentario;

        data.save((err, dataSaved)=> {
            if(err) return res.status(500).send({message:'Error al guardar'});
            if(!dataSaved) return res.status(404).send({message: 'Error 404: no se ha podido guardar'})

            return res.status(200).send({data: dataSaved});
        });    
    },

    getData: function(req,res){
            
        var dataId = req.params.id
        if (dataId == null) return res.status(404).send({message: 'Error 404: no se ha encontrado el archivo'})

        Data.findById(dataId, (err, data) => {
            if(err) return res.status(500).send({message:'Error al devolver los datos'});
            if(!data) return res.status(404).send({message: 'Error 404: no se ha encontrado el archivo'});

            return res.status(200).send({datas});
        });
    },

    getAllData: function (req, res) {
        
        Data.find({}).exec((err, data) => {
            if (err) return res.status(500).send({message: 'Error al devolver los datos'});
    
            if(!data) return res.status(404).send({message: 'No se han encontrado '});
    
            return res.status(200).send({data});
        });
    },
    
    getByName: function(req,res){
        
        var name = req.body.name   
        if (name==null) return res.status(404).send({message: 'Error 404: no se ha encontrado el archivo'});

        Data.find({nombre: name}).sort('apellido').exec((err, data) => {

            if (err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!data || data.length <1) return res.status(404).send({message: 'No se han encontrado el registro solicitado'});

            return res.status(200).send({data});
        });       
    },

    getByDni: function(req,res){
        
        var documento = req.body.documento
        if (documento == null) return res.status(404).send({message: 'Error 404: no se ha encontrado el archivo'});

        Data.find({dni: documento}).exec((err, data) => {
            if (err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!data || data.length < 1) return res.status(404).send({message: 'No se han encontrado el registro solicitado'});

            return res.status(200).send({ data });
        });          
    },

    updateData: function (req,res){
        
        var dataId = req.params.id;
        var update = req.body;

        Data.findByIdAndUpdate(dataId, update, {new:true}, (err, dataUpdated) => {
            if (err) return res.status(500).send({message: 'Error al actualizar'});

            if (!dataUpdated) return res.status(404).send({message: 'No existe el proyecto a actualizar'});

            return res.status(200).send({
                data: dataUpdated
            })
        })   
    },

    deleteData: function (req,res){
        
        var dataId = req.params.id;
        Data.findByIdAndDelete(dataId, (err, dataDeleted) => {
            if(err) return res.status(500).send({message: 'Error al eliminar'});

            if (!dataDeleted) return res.status(404).send({message: 'No existe el proyecto a eliminar'});

            return res.status(200).send({
                message: 'Archivo eliminado: ',
                data: dataDeleted
            })
        })      
    }
};

module.exports = controller;
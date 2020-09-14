'use strict'

var Project = require ('../models/project');

var controller = {
    
    saveProject: function(req,res){
                  
        var project = new Project();

        var params = req.body;
        project.nombre = params.nombre;
        project.apellido = params.apellido;
        project.dni = params.dni;
        project.nacimiento = params.nacimiento;
        project.domicilio = params.domicilio;
        project.mail = params.mail;
        project.comentario = params.comentario;

        project.save((err, projectStored)=> {
            if(err) return res.status(500).send({message:'Error al guardar'});
            if(!projectStored) return res.status(404).send({message: 'Error 404: no se ha podido guardar'})

            return res.status(200).send({project: projectStored});
        });    
    },

    getProject: function(req,res){
            
        var projectId = req.params.id
        if (projectId == null) return res.status(404).send({message: 'Error 404: no se ha encontrado el archivo'})

        Project.findById(projectId, (err, project) => {
            if(err) return res.status(500).send({message:'Error al devolver los datos'});
            if(!project) return res.status(404).send({message: 'Error 404: no se ha encontrado el archivo'})

            return res.status(200).send({project});
        });
    },

    getProjects: function (req, res) {
        
        Project.find({}).exec((err, projects) => {
            if (err) return res.status(500).send({message: 'Error al devolver los datos'});
    
            if(!projects) return res.status(404).send({message: 'No se han encontrado '});
    
            return res.status(200).send({projects});
        });
    },
    
    getByName: function(req,res){
        
        var name = req.body.name   
        if (name==null) return res.status(404).send({message: 'Error 404: no se ha encontrado el archivo'});

        Project.find({nombre: name}).sort('apellido').exec((err, projects) => {

            if (err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!projects || projects.length <1) return res.status(404).send({message: 'No se han encontrado el registro solicitado'});

            return res.status(200).send({projects});
        });       
    },

    getByDni: function(req,res){
        
        var documento = req.body.documento
        if (documento == null) return res.status(404).send({message: 'Error 404: no se ha encontrado el archivo'});

        Project.find({dni: documento}).exec((err, projects) => {
            if (err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!projects || projects.length < 1) return res.status(404).send({message: 'No se han encontrado el registro solicitado'});

            return res.status(200).send({projects});
        });         
    },

    updateProject: function (req,res){
        
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
            if (err) return res.status(500).send({message: 'Error al actualizar'});

            if (!projectUpdated) return res.status(404).send({message: 'No existe el proyecto a actualizar'});

            return res.status(200).send({
                project: projectUpdated
            })
        })   
    },

    deleteProject: function (req,res){
        
        var projectId = req.params.id;
        Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
            if(err) return res.status(500).send({message: 'Error al eliminar'});

            if (!projectDeleted) return res.status(404).send({message: 'No existe el proyecto a eliminar'});

            return res.status(200).send({
                message: 'Archivo eliminado: ',
                project: projectDeleted
            })
        })      
    }
};

module.exports = controller;
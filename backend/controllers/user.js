'use strict'
const jwt = require('jsonwebtoken');
var User = require ('../models/user');

var controller = {
    
    signUp: function(req, res){
        var user = new User()

        var params = req.body;
        user.email = params.email;
        user.password = params.password;
        

        user.save((err, userStored)=> {
            if(err) return res.status(500).send({message:'Error al guardar'});
            if(!userStored) return res.status(404).send({message: 'Error 404: no se ha podido guardar'})

            return res.status(200).send({user: userStored});
        })
    },

    signIn: function (req,res){
        var mail = req.body.email
        var pass = req.body.password

        if (mail==null) return res.status(404).send({message: 'Usuario incorrecto o contraseña incorrecta'});

        User.findOne({email: mail}).exec((err, user) => {

            if (err) return res.status(500).send({message: 'Usuario incorrecto o contraseña incorrecta'});

            if(!user || user.length <1) {
                return res.status(404).send({message: 'Usuario incorrecto o contraseña incorrecta'});
            }else if (user && pass == user.password){
                
                jwt.sign({user:user}, 'secretkey', {expiresIn: '1d'},(err, token) =>{
                    if(err) return res.json({err})
                    res.json({
                        token
                    })
                });
            
            }else{
                return res.status(500).send({message: 'Usuario incorrecto o contraseña incorrecta'});
            }

        });

        
    }
};

module.exports = controller;
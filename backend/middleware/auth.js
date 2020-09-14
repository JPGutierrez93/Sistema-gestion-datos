'use strict'
var jwt = require ('jsonwebtoken')

function auth (req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        
        jwt.verify(req.token, 'secretkey', (error) => {
            if(error){
                res.sendStatus(403)
            }else{
                next() 
            }
        })
        
    }else{
        res.sendStatus(403);
    }
}

module.exports = auth
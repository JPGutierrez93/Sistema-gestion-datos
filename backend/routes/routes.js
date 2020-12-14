'use strict'

var express = require ('express');
var DataController = require ('../controllers/data');
var UserController = require('../controllers/user')
var auth = require ('../middleware/auth')

var Data = require ('../models/data');


var router = express.Router();

router.get('/login', UserController.signIn);

router.post('/login', UserController.signIn);

router.post ('/save-data', auth, DataController.saveData);

router.get ('/data/:id?', auth, DataController.getData);

router.get ('/all-data', auth, DataController.getAllData);

router.post ('/all-data/byname',auth, DataController.getByName);

router.post ('/all-data/bydni',auth, DataController.getByDni);

router.put ('/data/:id',auth, DataController.updateData);

router.delete('/data/:id',auth, DataController.deleteData);

module.exports = router;
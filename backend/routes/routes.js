'use strict'

var express = require ('express');
var ProjectController = require ('../controllers/project');
var UserController = require('../controllers/user')
var auth = require ('../middleware/auth')

var Project = require ('../models/project');


var router = express.Router();

//router.post('/signup', UserController.signUp);

//router.get('/signup', UserController.signUp);

router.get('/login', UserController.signIn);

router.post('/login', UserController.signIn);

router.post ('/save-project', auth, ProjectController.saveProject);

router.get ('/project/:id?', auth, ProjectController.getProject);

router.get ('/projects', auth, ProjectController.getProjects);

router.post ('/projects/byname',auth, ProjectController.getByName);

router.post ('/projects/bydni',auth, ProjectController.getByDni);

router.put ('/project/:id',auth, ProjectController.updateProject);

router.delete('/project/:id',auth, ProjectController.deleteProject);

module.exports = router;
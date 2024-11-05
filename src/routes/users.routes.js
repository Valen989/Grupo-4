const express = require('express');
const router = express.Router();

const {register, processRegister, login, processLogin, logout} = require('../controllers/usersControllers.js');
const usersControllers = require('../controllers/usersControllers.js');


//users
router

    .get('/register', usersControllers.register )
    .post('/register', usersControllers.processRegister)
    .get('/login', usersControllers.login)
    .post('/login', usersControllers.processLogin)
    .get('/logout', usersControllers.logout)
    .get('/profile', usersControllers.profile)
    


module.exports = router
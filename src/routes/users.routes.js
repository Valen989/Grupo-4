const express = require('express');
const router = express.Router();

const {register, processRegister, login, processLogin, logout, profile, destroy} = require('../controllers/usersControllers.js');

//users
router

    .get('/register', register )
    .post('/register', processRegister)
    .get('/login', login)
    .post('/login', processLogin)
    .get('/logout', logout)
    .get('/profile', profile)
    .delete('/destroy/:id', destroy)
    


module.exports = router
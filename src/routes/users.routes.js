const express = require('express');
const router = express.Router();

const {register, processRegister, login, processLogin, logout} = require('../controllers/usersControllers.js')


//users
router

    .get('/register', register )
    .post('/process-register', processRegister)
    .get('/login', login)
    .post('/process-login', processLogin)
    .get('/logout', logout)




module.exports = router
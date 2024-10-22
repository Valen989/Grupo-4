const express = require('express');
const router = express.Router();

const {login} = require('../controllers/loginController')


//Admin
router

    .get('/', login)




module.exports = router
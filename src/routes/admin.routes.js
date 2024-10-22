const express = require('express');
const router = express.Router();

const {admin} = require('../controllers/adminController')


//Admin
router

    .get('/', admin )




module.exports = router
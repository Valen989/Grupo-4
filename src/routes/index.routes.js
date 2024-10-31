const express = require('express');
const router = express.Router();

const {index, about, admin} = require('../controllers/indexController')

// /
router

    .get('/', index )
    .get('/about', about)
    .get('/admin', admin)




module.exports = router
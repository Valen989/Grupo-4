const express = require('express');
const router = express.Router();

const {index, about, admin, contact} = require('../controllers/indexController')

// /
router

    .get('/', index )
    .get('/about', about)
    .get('/admin', admin)
    .get('/contact', contact)



module.exports = router
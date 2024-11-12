const express = require('express');
const router = express.Router();

const {index, about, admin, contact, error, stream, updateStream} = require('../controllers/indexController')

// /
router

    .get('/', index )
    .get('/about', about)
    .get('/admin', admin)
    .get('/contact', contact)
    .get('/error',error)
    .get('/stream', stream)
    .post('/stream',updateStream)

module.exports = router
const express = require('express');
const router = express.Router();

const {index, about, admin, contact, error, stream, updateStream} = require('../controllers/indexController');
const checkUserLogin = require('../middlewares/checkUserLogin');

// /
router

    .get('/', index )
    .get('/about', about)
    .get('/admin', checkUserLogin, admin)
    .get('/contact', contact)
    .get('/error',error)

module.exports = router
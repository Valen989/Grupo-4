const express = require('express');
const router = express.Router();

const {index, about} = require('../controllers/indexController')

// /
router

    .get('/', index )
    .get('/about', about)




module.exports = router
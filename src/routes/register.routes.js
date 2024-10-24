const express = require('express');
const router = express.Router();

const {register} = require('../controllers/registerController.js')


//records
router

    .get('/', register )




module.exports = router
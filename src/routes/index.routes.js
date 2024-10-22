const express = require('express');
const router = express.Router();
const path = require('path');

const {index, about} = require('../controllers/indexController')



router.get(['/', '/home'], index);

router.get('/about', about)        

module.exports = router;
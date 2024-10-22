const express = require('express');
const router = express.Router();

const {list} = require('../controllers/recordsController')


//records
router.get('/records', list);




module.exports = router
const express = require('express');
const router = express.Router();

const {list, add, create, edit, update, destroy} = require('../controllers/radiosController')


//records
router

    .get('/', list )
    .get('/add',add)
    .post('/add',create)
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .delete('/destroy/:id',destroy)



module.exports = router
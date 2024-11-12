const express = require('express');
const router = express.Router();

const {list, add, create, edit, update, destroy, index} = require('../controllers/radiosController')


//records
router

    .get('/', index )
    .get('/list', list )
    .get('/add',add)
    .post('/add',create)
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .delete('/destroy/:id',destroy)



module.exports = router
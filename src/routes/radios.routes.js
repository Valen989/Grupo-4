const express = require('express');
const router = express.Router();

const {list, add, create, edit, update, destroy, index} = require('../controllers/radiosController')


//radios
router

    .get('/', index )
    .get('/list', list )
    .get('/add',add)
    .post('/add',create)
    .get('/edit/:radio_id',edit)
    .put('/update/:radio_id',update)
    .delete('/destroy/:radio_id',destroy)



module.exports = router
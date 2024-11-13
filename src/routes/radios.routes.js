const express = require('express');
const router = express.Router();

const {list, add, create, edit, update, destroy, index} = require('../controllers/radiosController');
const checkUserLogin = require('../middlewares/checkUserLogin');


//radios
router

    .get('/', checkUserLogin, index )
    .get('/list', list )
    .get('/add',checkUserLogin, add)
    .post('/add',create)
    .get('/edit/:radio_id',checkUserLogin, edit)
    .put('/update/:radio_id',update)
    .delete('/destroy/:radio_id',destroy)



module.exports = router
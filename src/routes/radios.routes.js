const express = require('express');
const router = express.Router();

const {list, add, create, edit, update, destroy, index, detail} = require('../controllers/radiosController');
const checkUserLogin = require('../middlewares/checkUserLogin');
const checkUserAdmin = require('../middlewares/checkUserAdmin');


//radios
router

    .get('/', checkUserAdmin, index )
    .get('/list', list )
    .get('/detail/:radio_id', detail)
    .get('/add',checkUserAdmin, add)
    .post('/add',create)
    .get('/edit/:radio_id',checkUserAdmin, edit)
    .put('/update/:radio_id',update)
    .delete('/destroy/:radio_id',destroy)



module.exports = router
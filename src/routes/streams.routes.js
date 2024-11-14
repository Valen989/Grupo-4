const express = require('express');
const router = express.Router();

const { index, list, add, create, edit, update, destroy, detail, } = require('../controllers/streamsController');
const checkUserLogin = require('../middlewares/checkUserLogin');

//streams
router

    .get('/',checkUserLogin, index )
    .get('/list', list )
    .get('/detail/:radio_id', detail)
    .get('/add', checkUserLogin, add)
    .post('/add',create)
    .get('/edit/:stream_id',checkUserLogin, edit)
    .put('/update/:stream_id',update)
    .delete('/destroy/:stream_id',destroy)
    



module.exports = router
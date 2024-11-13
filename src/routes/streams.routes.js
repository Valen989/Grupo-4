const express = require('express');
const router = express.Router();

const { index, list, add, create, edit, update, destroy } = require('../controllers/streamsController');
const checkUserLogin = require('../middlewares/checkUserLogin');

//streams
router

    .get('/',checkUserLogin, index )
    .get('/list', list )
    .get('/add', checkUserLogin, add)
    .post('/add',create)
    .get('/edit/:stream_id',checkUserLogin, edit)
    .put('/update/:stream_id',update)
    .delete('/destroy/:stream_id',destroy)



module.exports = router
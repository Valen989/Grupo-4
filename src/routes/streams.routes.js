const express = require('express');
const router = express.Router();

const { index, list, add, create, edit, update, destroy } = require('../controllers/streamsController')

//streams
router

    .get('/', index )
    .get('/list', list )
    .get('/add',add)
    .post('/add',create)
    .get('/edit/:stream_id',edit)
    .put('/update/:stream_id',update)
    .delete('/destroy/:stream_id',destroy)



module.exports = router
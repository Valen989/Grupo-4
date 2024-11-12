const express = require('express');
const router = express.Router();

const {list, add, create, edit, update, destroy, index} = require('../controllers/recordsController')


//records
router

.get('/', index )
.get('/list',list)
.get('/add',add)
.post('/add',create)
.get('/edit/:record_id',edit)
.put('/update/:record_id',update)
.delete('/destroy/:record_id',destroy)




module.exports = router
const express = require('express');
const router = express.Router();

const {list, add, create, edit, update, destroy, index} = require('../controllers/recordsController');
const checkUserLogin = require('../middlewares/checkUserLogin');


//records
router

.get('/', checkUserLogin, index )
.get('/list',list)
.get('/add',checkUserLogin, add)
.post('/add',create)
.get('/edit/:record_id',checkUserLogin, edit)
.put('/update/:record_id',update)
.delete('/destroy/:record_id',destroy)




module.exports = router
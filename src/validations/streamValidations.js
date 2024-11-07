const {check, body} = require ("express-validator")
const {getData} = require('../data')
const users = getData('users.json')
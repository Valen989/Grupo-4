const {check, body} = require ("express-validator")
const {getData} = require('../data')
const records = getData('records.json')


module.exports =[
    check("title")
    .notEmpty()
    .withMessage("El titulo del stream es obligatorio").bail(),

    check("date")
    .notEmpty()
    .withMessage("La fecha del stream es obligatorio").bail(),

    check("link")
    .notEmpty()
    .withMessage("El link del stream es obligatorio").bail(),


    

];
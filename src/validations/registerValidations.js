const {check, body} = require ("express-validator")
const {getData} = require('../data')
const users = getData('users.json')

module.exports =[
    check("first_name")
    .notEmpty()
    .withMessage("El nombre es obligatorio").bail(),


    body("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .custom((value, {req}) => {
        const user = users.find(user => user.email == value)
        if(user){
            return false
        }
        return true
    }).withMessage("El email ya se encuentra registrado"),
    check("password")
    .notEmpty().withMessage("El password es obligatorio").bail()
    .matches(/^[A-Z]\w*$/).withMessage("La primera letra debe tener una mayuscula y el password debe tener minimo un numero")
    

];
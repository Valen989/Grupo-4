require('dotenv').config()
const Radio = require("../models/Radio")

const getAll = async (req,res,next) => {
    const radios = await Radio.find().where('_id').ne(process.env.ID_RADIO)
    res.locals.allRadios = radios
    next()
}


module.exports = {
    getAll
}
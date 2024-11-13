const Radio = require("../models/Radio")

const getAll = async (req,res,next) => {
    const radios = await Radio.find()
    res.locals.allRadios = radios
    next()
}


module.exports = {
    getAll
}
module.exports = {
    index : (req,res) => {
        return res.render('home')
    },
    about : (req,res) => {
        return res.render('about')
    },
    admin : (req,res) => {
        return res.render('admin')
    },
    contact : (req,res) => {
        return res.render('contact')
    },
    error : (req,res) => {
        return res.render('error')
    },
    stream : (req,res) => {
        return res.render('stream')
    },
    updateStream : (req,res) => {
        return res.send(req.body)
    }
}
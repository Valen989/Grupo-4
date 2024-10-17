module.exports = {
    index : (req,res) => {
        return res.render('home')
    },
    about : (req,res) => {
        return res.render('about')
    }
}
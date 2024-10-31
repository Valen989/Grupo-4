module.exports = {
    register : (req,res) => {
        return res.render('users/register')
    },
    processRegister : (req,res) => {
        return res.send(req.body)
    },
    login : (req,res) => {
        return res.render('users/login')
    },
    processLogin : (req,res) => {
        return res.send(req.body)
    },
    logout : (req,res) => {
        return res.send('chauu')
    },
    profile : (req,res) => {
        return res.render('users/profile')
    }

}
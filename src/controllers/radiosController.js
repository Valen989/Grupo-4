module.exports = {
    list : (req,res) => {
        return res.render('radios/list')
    },
    add : (req,res) => {
        return res.render('radios/add')

    },
    create : (req,res) => {
        return res.send(req.body)

    },
    edit : (req,res) => {
        return res.render('radios/edit')

    },
    update : (req,res) => {
        return res.send(req.body)

    },
    destroy : (req,res) => {
        return res.send(req.body)

    }
}
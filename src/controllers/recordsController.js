module.exports = {
    index : (req,res) => {
        return res.render('records/index')
    },
    list : (req,res) => {
        return res.render('records/list')
    },
    add : (req,res) => {
        return res.render('records/add')
    },
    create : (req,res) => {
        return res.send(req.body)

    },
    edit : (req,res) => {
        return res.render('records/edit')

    },
    update : (req,res) => {
        return res.send(req.body)

    },
    destroy : (req,res) => {
        return res.send(req.body)

    }
}
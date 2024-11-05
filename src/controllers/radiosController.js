const path = require('path');
const { getData, storeData } = require("../data");
const radios = getData("radios.json");


module.exports = {
    list : (req,res) => {
        return res.render('radios/list')
    },
    add : (req,res) => {
        return res.render('radios/add')

    },
    create : (req,res) => {
        create: (req, res) => {
            const errors = validationResult(req);
        
            if(errors.isEmpty()){
              const { name, city, province, frequency, admin } = req.body;
            
              //guardar datos
              const newProduct = {
                id: +radios[radios.length - 1].id + 1,
                name: name.trim(),
                city: city.trim(),
                province: province.trim(),
                frequency: +frequency,
                admin: +admin,
                image: req.file ? req.file.filename : "http://dummyimage.com/200x300.png/cc0000/ffffff",
              };
          
              radios.push(newRadios);
          
              storeData(radios,'radios.json')
          
              //respuesta al cliente
              return res.redirect(`/radios/${newRadio.id}`)
            }
            return res.send(req.body)
          },
        

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





const path = require('path');
const { getData, storeData } = require("../data");
const radios = getData("radios.json");
const radiosOrdered = radios.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase()
      ? 1
      : a.name.toLowerCase() < b.name.toLowerCase()
      ? -1
      : 0
  );

module.exports = {
    list : (req,res) => {
        return res.render("radios", {
             radios,
             
        });
        
    },
    add : (req,res) => {
        return res.render('radios-add',{
            radios: radiosOrdered,

        });

    },
    create : (req,res) => {
       
            const errors = validationResult(req);
        
            if(errors.isEmpty()){
              const { name, city, province, frequency, admin } = req.body;
            
              //guardar datos
              const newRadio = {
                id: +radios[radios.length - 1].id + 1,
                name: name.trim(),
                city: city.trim(),
                province: province.trim(),
                frequency: +frequency,
                admin: +admin,
                image: req.file ? req.file.filename : "http://dummyimage.com/200x300.png/cc0000/ffffff",
              };
          
              radios.push(newRadio);
          
              storeData(radios,'radios.json')
          
              //respuesta al cliente
              return res.redirect(`/radios/${newRadio.id}`)
            }
        },
            
        
    edit : (req,res) => {
        return res.render('radios/edit')

    },
    update : (req,res) => {

    const {radio_id} = req.params
    const {name, city, province, frequency, admin} = req.body
    const radiosModified = products.map(radio => {
        if(radio.id === +radio_id){

            radio = {
              ...radio,
              name : name.trim(),
              city : city.trim(),
              province : province.trim(),
              frequency : frequency,
              admin : admin,
            }
        }
        return radio
  })
        storeData(radiosModified,'radios.json');

        return res.render('radios',{
          radios : radiossModified
        })
    },
    destroy : (req,res) => {
        return res.send(req.body)

    }
}






const { getData, storeData } = require("../data");

const radios = getData("radios.json");
const radiosOrdered = radios.sort((a, b) =>
  a.name.toLowerCase() > b.name.toLowerCase()
    ? 1
    : a.name.toLowerCase() < b.name.toLowerCase()
    ? -1
    : 0
);

module.exports= {
    create: (req, res) => {
        const radios = getData("radios.json");    
        const errors = validationResult(req);
    
        if(errors.isEmpty()){
          const { name, city, province, frequency, admin } = req.body;
        
          //guardar datos
          const newradio = {
            id: +radios[radios.length - 1].id + 1,
            name: name.trim(),
            city: city.trim(),
            province: province.trim(),
            frequency: +frequency,
            admin: +admin,
            image: req.file ? req.file.filename : "http://dummyimage.com/200x300.png/cc0000/ffffff",
          };
      
          radios.push(newradio);
      
          storeData(radios,'radios.json')
      
          //respuesta al cliente
          return res.redirect(`/radios/${newradio.id}`)
        }else{
          
          return res.render('radios-add',{
            radios: radiosOrdered,
            errors : errors.mapped(),
            old : req.body
          })
        }
        
},
edit: (req, res) => {
  const radios = getData("radios.json");
  const brandsOrdered = brands.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase()
      ? 1
      : a.name.toLowerCase() < b.name.toLowerCase()
      ? -1
      : 0
  );

  const {radio_id} = req.params;

  const radio = radios.find(radio => radio.id === +radio_id)

  return res.render("radio-edit", {
    radios: radiosOrdered,
    ...radio
  });
},
add: (req, res) => {

  return res.render("radio-add", {
    radios: radiosOrdered,
  });
},
destroy : (req,res) => {
  const radios = getData("radios.json");
  const {radio_id} = req.params

  const radiosModified = radios.filter(radio => radio.id !== +radio_id);

  storeData(radiosModified,'radios.json');

  return res.render('radios',{
    radios : radiosModified
  })
},
update : (req,res) => {
  const radios = getData("radios.json");

  const {radio_id} = req.params
  const {name, city, province, frequency, admin, discount} = req.body

  const radiosModified = radios.map(radio => {
        if(radio.id === +radio_id){

            radio = {
              ...radio,
              name : name.trim(),
              city : city,
              province : province.trim(),
              frequency : frequency,
              admin : admin,
            }
        }
        return radio
  })

  storeData(radiosModified,'radios.json');

  return res.render('radios',{
    radios : radiosModified
  })
}
}
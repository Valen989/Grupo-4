const path = require("path");
const { getData, storeData } = require("../data");
const User = require("../models/User.js");
const Radio = require("../models/Radio.js");
const { validationResult } = require("express-validator");
const Record = require("../models/Record.js");
const radios = getData("radios.json");
const Stream = require("../models/Stream.js");
const radiosOrdered = radios.sort((a, b) =>
  a.name.toLowerCase() > b.name.toLowerCase()
    ? 1
    : a.name.toLowerCase() < b.name.toLowerCase()
    ? -1
    : 0
);

module.exports = {
  index: async (req, res) => {

    try {

      const radios = await Radio.find().populate('user')
      console.log(radios);
      

      return res.render("radios/index", {
        radios,
      });
      
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
   
  },
  list: (req, res) => {
    return res.render("radios/list", {
      radios,
    });
  },
  detail: async (req, res) => {
    try {
        const radioId = req.params.id; // Asegúrate de que estás usando 'id' como parámetro
        console.log("Radio ID:", radioId); // Log para depuración

        // Validar si radioId está definido
        if (!radioId) {
            return res.status(400).send("ID de radio no proporcionado");
        }

        // Busca el stream en vivo asociado a la radio
        const stream = await Stream.findOne({ radio: radioId }).sort({ date: -1 });
        console.log("Stream encontrado:", stream); // Log para depuración

        if (!stream) {
            return res.status(404).send("No hay stream en vivo disponible para esta radio");
        }

        // Redirige a la URL del stream en vivo
        return res.redirect(`/streams/detail/${stream._id}`);
    } catch (error) {
        console.error("Error en el controlador detail:", error);
        return res.redirect("/error");
    }
},

  add: async (req, res) => {
    try {
      const users = await User.find().sort("username");
      return res.render("radios/add", {
        users,
      });
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
  },
  create: async (req, res) => {
    const errors = validationResult(req);

    try {
      if (errors.isEmpty()) {
        const { name, city, province, frequency, user } = req.body;

        const newRadio = new Radio({
          name: name.trim(),
          city: city.trim(),
          province: province.trim(),
          frequency: frequency,
          user,
          image: req.file
            ? req.file.filename
            : "http://dummyimage.com/200x300.png/cc0000/ffffff",
        });

        await newRadio.save();

        return res.redirect(`/radios`);
      }
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
  },

  edit: async (req, res) => {

    try {
      const { radio_id } = req.params;
      const radio = await Radio.findById(radio_id);

      if (!radio) throw new Error("RADIO NOT FOUND");

      const users = await User.find();

      return res.render('radios/edit',{
        radio,
        users
      })

    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }

    return res.render("radios/edit");
  },
  update: async (req, res) => {
    try {
      const { radio_id } = req.params;
      const { name, city, province, frequency, user } = req.body;
      
      const radioUpdated = await Radio.findByIdAndUpdate(radio_id, {
        name: name.trim(),
        city: city.trim(),
        province: province.trim(),
        frequency: frequency,
        user
      });

      if (!radioUpdated) throw new Error("RADIO NOT FOUND");
  
      return res.redirect("/radios");
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
   
  },
  destroy: async (req, res) => {
    try {

        const radioToDelete = await Radio.findByIdAndDelete(req.params.radio_id)

        if (!radioToDelete) throw new Error('RADIO NOT FOUND');

            await Record.deleteMany({
                radio: radioToDelete.id
            })
        return res.redirect('/radios')

    } catch (error) {
        console.log(error)
        return res.redirect('/error')
    }
}
};

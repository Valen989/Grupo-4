const path = require("path");
const { getData, storeData } = require("../data");
const User = require("../models/User.js");
const Radio = require("../models/Radio.js");
const { validationResult } = require("express-validator");
const radios = getData("radios.json");
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
  destroy: (req, res) => {
    return res.send(req.body);
  },
};

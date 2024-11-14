require('dotenv').config()
const { validationResult } = require("express-validator");
const Radio = require("../models/Radio.js");
const Record = require("../models/Record.js");

module.exports = {
  index: async (req, res) => {
    try {
      const radios = await Radio.find({
        user : req.session.userLogin.id
      })    

      async function processRadios(radios) {
        const records = [];
        
        for (const r of radios) {
          try {
            const record = await Record.find({ radio: r.id }).populate("radio");
            records.push(...record);
          } catch (error) {
            console.error(`Error processing radio ${r.id}:`, error);
          }
        }
      
        return records;
      }

      const records = await processRadios(radios);
    
      return res.render("records/index", {
        records,
      });
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
  },
  list: async (req, res) => {
    try {
      // Obtén el radioId del query string
      const { radioId } = req.query;
  
      // Verifica que se haya proporcionado un radioId
      if (!radioId) {
        return res.status(400).send("ID de radio no proporcionado");
      }
  
      // Busca la radio correspondiente al radioId proporcionado
      const radio = await Radio.findById(radioId);
  
      if (!radio) {
        return res.status(404).send("Radio no encontrada");
      }
  
      // Luego, busca los registros que correspondan a esa radio
      const records = await Record.find({
        radio: radio.id // usa el ID de la radio encontrada
      }).populate("radio");
  
      return res.render("records/list", {
        records,
      });
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
  },
  add: async (req, res) => {
    try {
      const radios = await Radio.find({
        user: req.session.userLogin.id,
      }).sort("name");
      return res.render("records/add", {
        radios,
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
        const { title, date, description, link, radio } = req.body;

        const newRecord = new Record({
          title: title.trim(),
          date,
          description: description.trim(),
          link,
          radio,
        });

        await newRecord.save();

        return res.redirect(`/records`);
      }
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
  },
  edit: async (req, res) => {
    try {
      const { record_id } = req.params;
      const record = await Record.findById(record_id);

      if (!record) throw new Error("RECORD NOT FOUND");

      const radios = await Radio.find();

      return res.render("records/edit", {
        record,
        radios,
      });
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
  },
  update: async (req, res) => {
    try {
      const { record_id } = req.params;
      const { title, date, description, link, radio } = req.body;

      const recordUpdated = await Record.findByIdAndUpdate(record_id, {
        title: title.trim(),
        date,
        description: description.trim(),
        link,
        radio,
      });

      if (!recordUpdated) throw new Error("RECORD NOT FOUND");

      return res.redirect("/records");
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
  },
  destroy: (req, res) => {
    return res.send(req.body);
  },
};

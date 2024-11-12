const { validationResult } = require("express-validator");
const Radio = require("../models/Radio.js");
const Record = require("../models/Record.js");

module.exports = {
    index : async (req,res) => {
        try {

            const records = await Record.find().populate('radio')
      
            return res.render("records/index", {
                records,
            });
            
          } catch (error) {
            console.log(error);
            return res.redirect("/error");
          }
    },
    list : (req,res) => {
        return res.render('records/list')
    },
    add : async  (req,res) => {
        try {
            const radios = await Radio.find().sort("name");
            return res.render("records/add", {
              radios,
            });
          } catch (error) {
            console.log(error);
            return res.redirect("/error");
          }
    },
    create : async (req,res) => {
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
    edit : async (req,res) => {
      try {
        const { record_id } = req.params;
        const record = await Record.findById(record_id);
  
        if (!record) throw new Error("RECORD NOT FOUND");
  
        const radios = await Radio.find();
  
        return res.render('records/edit',{
          record,
          radios
        })
  
      } catch (error) {
        console.log(error);
        return res.redirect("/error");
      }

    },
    update : async (req,res) => {
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
    destroy : (req,res) => {
        return res.send(req.body)

    }
}
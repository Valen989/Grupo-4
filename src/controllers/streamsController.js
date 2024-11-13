const User = require("../models/User.js");
const Radio = require("../models/Radio.js");
const { validationResult } = require("express-validator");
const Stream = require("../models/Stream.js");
const Record = require("../models/Record.js");


module.exports = {
  index: async (req, res) => {

    try {

      const streams = await Stream.find().populate('radio').populate('user')      

      return res.render("streams/index", {
        streams,
      });
      
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
   
  },
  list: (req, res) => {
    return res.render("streams/list");
  },
  detail : async (req,res) => {
    try {
      const stream = await Stream.findOne({
        radio : req.params.radio_id
      }).populate('radio');

      const records = await Record.find({
        radio : stream.radio
      })
      return res.render('streams/detail',{
        stream,
        records
      })
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
  },
  add: async (req, res) => {
    try {

      const radios = await  Radio.find({
        user : req.session.userLogin.id
      });

      return res.render("streams/add",{
        radios
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
        const { title, link, description, radio, date} = req.body;

        const newStream = new Stream({
          title: title.trim(),
          description: description.trim(),
          link: link.trim(),
          date,
          radio,
          user : req.session.userLogin.id,
        });

        await newStream.save();

        return res.redirect(`/streams`);
      }
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
  },

  edit: async (req, res) => {

    try {

        const stream = await Stream.findById(req.params.id).populate('user').populate('radio')
        const radios = await  Radio.find({
          user : req.session.userLogin.id
        });
  
        return res.render("stream",{
          radios,
          stream
        });
  
      } catch (error) {
        console.log(error);
        return res.redirect("/error");
      }

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

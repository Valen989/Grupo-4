require('dotenv').config()
const { validationResult } = require("express-validator");
const Radio = require("../models/Radio.js");
const User = require("../models/User.js");
const Stream = require("../models/Stream.js");

module.exports = {
  index: async (req, res) => {
    const stream = await Stream.findOne({
      radio : process.env.ID_RADIO
    }); 
    console.log(stream);
    
    return res.render("home", { stream }); 
},
  about: (req, res) => {
    return res.render("about");
  },
  admin: async (req, res) => {
    try {

      if(req.session.userLogin.rol == "admin"){
        const users = await User.find();

        return res.render("admin", {
          users,
        });
      }
      return res.redirect('/streams')
   
    } catch (error) {
      console.log(error);
      return res.redirect("/error");
    }
  },
  contact: (req, res) => {
    return res.render("contact");
  },
  error: (req, res) => {
    return res.render("error");
  },
 
};

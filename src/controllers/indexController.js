const User = require("../models/User.js");

module.exports = {
  index: (req, res) => {
    return res.render("home");
  },
  about: (req, res) => {
    return res.render("about");
  },
  admin: async (req, res) => {
    try {
      const users = await User.find();

      return res.render("admin", {
        users,
      });
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
  stream: (req, res) => {
    return res.render("stream");
  },
  updateStream: (req, res) => {
    return res.send(req.body);
  },
};

module.exports = (req, res, next) => {
  if (req.session.userLogin && req.session.userLogin.rol == "admin") {
    return next();
  } else {
    return res.redirect("/admin");
  }
};

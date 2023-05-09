module.exports = (req, res, next) => {
  if (req.session.isAuthadmin) {
    next();
  } else {
    req.session.error = "You have to Login first";
    res.redirect("/loginadmin");
  }
};
const bcrypt = require("bcryptjs");


const Admin = require("../models/admin");

//////////////////admin////////////////////////
const loginadmin_get = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("loginadmin", { err: error });
};
//
const loginadmin_post = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  
  if (!admin) {
    req.session.error = "Invalid email";
    return res.redirect("/loginadmin");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    req.session.error = "Invalid password";
    return res.redirect("/loginadmin");
  }else{

  req.session.isAuthadmin = true;
  req.session.adminname = admin.adminname;
  res.redirect("/donations/viewall");
}
};
//
const registeradmin_get = (req, res) => {
  const error = req.session.error;
  req.session.error = undefined;
  res.render("registeradmin", { err: error });
};
//
const registeradmin_post = async (req, res) => {
  const { adminname, email, password } = req.body;

  let admin = await Admin.findOne({ email: email });

  if (admin) {
    req.session.error = "Admin already exists";
    return res.redirect("/registeradmin");
  }

  const hasdPsw = await bcrypt.hash(password, 12);

  admin = new Admin({
    adminname,
    email,
    password: hasdPsw,
  });

  await admin.save();
  res.redirect("/loginadmin");
};

const dashboardadmin_get = (req, res) => {
  const adminname = req.session.adminname;
 
  res.render("dashboardadmin", { name: adminname });

};



const logoutadmin_post = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};
//////////////////////////////
module.exports = {  
                  loginadmin_get, loginadmin_post, 
                  registeradmin_get, registeradmin_post, dashboardadmin_get, 
                  logoutadmin_post};
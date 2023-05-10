const express = require('express');
const adminController = require('../controllers/adminController');

const { check } = require('express-validator');
const isAuthadmin = require("../middleware/isAuthadmin");
const admiinrouter = express.Router();


admiinrouter.get("/loginadmin", adminController.loginadmin_get);
admiinrouter.post("/loginadmin", adminController.loginadmin_post);

// Register Page
admiinrouter.get("/registeradmin", adminController.registeradmin_get);
admiinrouter.post("/registeradmin", adminController.registeradmin_post);

// Dashboard Page
admiinrouter.get("/dashboardadmin", isAuthadmin, adminController.dashboardadmin_get);

admiinrouter.use("/logoutadmin", adminController.logoutadmin_post);

module.exports = admiinrouter;
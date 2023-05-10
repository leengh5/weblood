const express = require('express');
const donationsController = require('../controllers/donationsController');
const isAuthadmin = require("../middleware/isAuthadmin");
const { check } = require('express-validator');

const router = express.Router();


// Open page routes
router.get('/add', donationsController.open_add_donation_form);


// read routes

router.get('/viewall', isAuthadmin,donationsController.view_donations);
// write routes
router.post('/add' ,  donationsController.add_donation);

//router.post('/update', donationsController.update_donation);
router.delete('/delete/:id', donationsController.delete_donation);

module.exports = router;
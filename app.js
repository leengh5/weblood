const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();




const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let sessionStore = new MongoDBStore({
	uri: process.env.MONGO_URI,
	collection: 'mySessions'
});

// Catch errors
sessionStore.on('error', function(error) {
  console.log(error);
});

// configure session middleware
app.use(session({
	secret: process.env.SESSION_SECRET,
	cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
	saveUninitialized: true,
	resave: true,
	store: sessionStore
}));

//=================== Routes



/////////////admin////////////////////

const adminRouter = require('./routes/adminRoutes');

app.use('/', adminRouter);


//////////donation//////////////////////////////////
const donationsRouter = require('./routes/donationsRoutes');

const { check, validationResult } = require('express-validator');
// Add donations Routes handler
app.use('/donations', donationsRouter);
////////////////////////////////////////////



/////////////////////////////////////////////////////
///////////////////Define routes for each page//////////////////////////////////



// 
app.get('/', (req, res) => {
  res.render('HomePage');
});

app.get('/AboutUs', (req, res) => {
  res.render('AboutUs');
});

app.get('/Donate', (req, res) => {
  res.render('NewDonation');
});

app.get('/FAQ', (req, res) => {
  res.render('FAQ');
});

app.get('/ContactUs', (req, res) => {
  res.render('ContactUs');
});

app.get('/NewDonation', (req, res) => {
  res.render('NewDonation');
});

app.get('/UserHistory', (req, res) => {
  res.render('UserHistory');
});

app.get('/donationInfo', (req, res) => {
  res.render('donationInfo');
});

app.get('/thanks', (req, res) => {
  res.render('thanks');
});

app.get('/deleted', (req, res) => {
  res.render('deleted');
});
///////////////////////////////////////////////////
// Connect to database then start server
mongoose.connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("Connected to database...");
    app.listen(process.env.port, 'localhost', () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

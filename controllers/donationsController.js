const donation = require('../models/donation');

const { validationResult } = require('express-validator');

// Open web pages routes
const open_add_donation_form = (request, response) => {
  response.render('add_donation_form', {title: 'Add donation'});
}

const open_search_donation_page = (request, response) => {
  response.render('search_donations', {title: 'Search donation', donations: null});
}

// read functions
const find_donations = (request, response) => {
  let name = request.query.name;
  
  let nameRegex = (name.length > 0)? new RegExp(name, 'i') : null;
  
  let search = {};
  if( nameRegex != null && codeRegex != null){
    search = { $or: [ { 'name': { "$regex": nameRegex } }
                    ]};
  }else if(codeRegex != null){
    search = { 'code': { "$regex": codeRegex } };
  } else {
    response.status(204).end(); // no data, do nothing
  }
  donation.find(search)
    .then((data) => {
      if(response._closed == false)
        response.render('search_donations', {title: "Search donations", donations: data});
    })
    .catch((err) => { console.log(err) })
};
////////////////////////////////
const view_donations = (request, response) => {
 
  donation.find()
    .then((data) => {
      if(response._closed == false)
        response.render('viewall', {title: "view all donations", donations: data});
    })
    .catch((err) => { console.log(err) })
};
//////////////////////////////////////////////////
const get_donations_byID = (request, response) => {
  donation.findById(params.body.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => { console.log(err) })
};

const get_donations_byCategory = (request, response) => {
  let category = request.body.category;
  donation.find({ category: category})
    .then((data) => {
      response.send(data);
    })
    .catch((err) => { console.log(err) })
};

// write functions
const add_donation = (request, response) => {

  let donationcase   = request.body.donationcase; 
  let name   = request.body.name; 
  let email= request.body.email;
  let phone= request.body.phone;
  let age= request.body.age;
  let gender= request.body.gender;
  let bloodtype= request.body.bloodtype;
  let subject= request.body.subject;

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
     return response.status(422).json({ errors: errors.array() });
  }

  let art = new donation({ donationcase:donationcase,name:name,email: email, phone: phone,age:age,gender:gender ,bloodtype:bloodtype , subject:subject});
  art.save()
    .then((data) => {
      console.log(`donation saved to database: id -> ${data._id}`);
      response.redirect('/thanks');
    })
    .catch((err) => { console.log(err) });
};

const update_donation = (request, response) => {

};
/////////////////////////
const delete_donation = (request, response) => {
  let id = request.params.id;

  donation.findByIdAndDelete(id)
    .then((result) => {
      console.log(`Donation deleted from database: id -> ${result._id}`);
      response.json({ redirect: '/deleted'});
    })
    .catch((err) => { console.log(err) });
};

///////////////////////////////////

module.exports = {open_add_donation_form, open_search_donation_page,
                  find_donations, get_donations_byID, get_donations_byCategory, 
                  add_donation, update_donation, delete_donation,view_donations
                };
////////////////////////////////
              
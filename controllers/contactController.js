const contact = require('../models/contact');


  const add_donation = (request, response) => {

    let name   = request.body.name; 
    let email= request.body.email;
    let phone= request.body.phone;
    let message = request.body.message;
    
  
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
       return response.status(422).json({ errors: errors.array() });
    }
  
    let msg = new donation({ name:name,email: email, phone: phone,message:message});
    msg.save()
      .then((data) => {
        console.log(`contact saved to database: id -> ${data._id}`);
      
      })
      .catch((err) => { console.log(err) });
  };


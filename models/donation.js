const mongoose = require("mongoose");

const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const donationSchema = new Schema({


donationcase: {
  type: String,
  required: true,
},
    name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bloodtype: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  }

});

//donationSchema.plugin(AutoIncrement, { inc_field: "id" });
module.exports = mongoose.model("Donation", donationSchema);
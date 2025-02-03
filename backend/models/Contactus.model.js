const mongoose = require("mongoose");
const { Schema } = mongoose;



const contactusschema = new Schema({
  fullname: String,
  email: String,
  phone: Number,
  subject: String,
  userId: String,
  message: String
}, { timestamps: true });





const Contactus = mongoose.model("Contactus", contactusschema)

module.exports = Contactus;

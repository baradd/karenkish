const mongoose = require("mongoose");

const contactusmsgSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    max: 70,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    min: 5,
    max: 15,
    trim: true,
  },
  title: {
    type: String,
    min: 30,
    max: 75,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    min: 10,
    max: 2100,
    required: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const ContactUsMsg = mongoose.model("ContactUsMsg", contactusmsgSchema);

module.exports = { ContactUsMsg };

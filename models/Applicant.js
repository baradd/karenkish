const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  firstname: {
    type: String,
    min: 2,
    max: 50,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    min: 2,
    max: 50,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    max: 70,
    unique: true,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    min: 5,
    max: 15,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    min: 5,
    max: 100,
  },
  event: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = { Applicant };

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 30,
    max: 75,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    min: 100,
    max: 2100,
    required: true,
    trim: true,
  },
  organizer: {
    type: String,
    min: 3,
    max: 100,
    trim: true,
  },
  place: {
    type: String,
    min: 5,
    max: 100,
    required: true,
    trim: true,
  },
  date: { type: Date, required: true },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    min: 2,
    max: 20,
  },
  status: {
    type: String,
    enum: ["performed", "on performing", "cancled", "soon"],
    default: "soon",
  },
  price: { type: Number, min: 0, trim: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  applicant: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Applicant",
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 3,
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
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  sessionTime: {
    type: Number,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "Teacher",
  },
  student: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = { Course };

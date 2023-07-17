const mongoose = require("mongoose");
const { course, Course } = require("./Course");

const teacherSchema = new mongoose.Schema({
  fullname: {
    type: String,
    min: 5,
    max: 100,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    enum: [
      "starter",
      "elemantary",
      "intermediate",
      "upper intermediate",
      "advance",
    ],
    default: "starter",
  },
  email: {
    type: String,
    max: 70,
    unique: true,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: "teacher.png",
    required: true,
  },
  phone: {
    type: String,
    min: 5,
    max: 15,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    min: 5,
    max: 100,
  },
});

teacherSchema.pre("deleteOne", async function (next) {
  try {
    let teacher = this;
    await Course.updateMany(
      { teacher: teacher._conditions.id },
      {
        $set: {
          teacher: null,
        },
      }
    );
    next();
  } catch (err) {
    next(err);
  }
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = { Teacher };

const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema({
  numStudents: { type: Number, required: true },
  numStaffs: { type: Number, required: true },
  numExams: { type: Number, required: true },
  numBranches: { type: Number, required: true },
});

const Statistic = mongoose.model("statistic", statisticSchema);

module.exports = { Statistic };

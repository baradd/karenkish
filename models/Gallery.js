const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    min: 3,
    max: 20,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);
module.exports = {
  Gallery,
};

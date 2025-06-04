const mongoose = require("mongoose");

const ratingModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now  // This will set the current date when a new rating is created
  }
});

const RatingModel = mongoose.model("Rating", ratingModel);

module.exports = RatingModel;
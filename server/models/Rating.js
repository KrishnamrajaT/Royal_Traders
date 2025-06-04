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
    type: String, 
    required:false
  }
});

const RatingModel = mongoose.model("Rating", ratingModel);

module.exports = RatingModel;

const mongoose = require("mongoose");

const videoReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  date: {
  type: Date,
  required: false,
  default: Date.now,
  },
});

const VideoReview = mongoose.models.VideoReview || mongoose.model("VideoReview", videoReviewSchema);

module.exports = VideoReview;

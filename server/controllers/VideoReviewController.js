const VideoReview = require("../models/videoReview");

// (date parsing helper removed) date is set by model default on insert

// Create a new video review
// Note: date is intentionally ignored from the request body so the DB/model default is used.
const createVideoReview = async (req, res) => {
  const { title, videoUrl } = req.body;
  try {
    const newReview = new VideoReview({ title, videoUrl });
    await newReview.save();
    res.status(201).json({ message: "Video review created", data: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all video reviews
const getAllVideoReviews = async (req, res) => {
  try {
    const reviews = await VideoReview.find().sort({ date: -1 }).lean();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete all video reviews
const deleteAllVideoReviews = async (req, res) => {
  try {
    const result = await VideoReview.deleteMany({});
    res.status(200).json({ message: "All video reviews deleted", deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createVideoReview, getAllVideoReviews, deleteAllVideoReviews };

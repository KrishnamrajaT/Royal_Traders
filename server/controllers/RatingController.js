const addRating = require("../models/Rating");

// Add new rating
const AddRating = async (req, res) => {
  const { name, mobile, email, rating, message } = req.body;

  try {
    const newRating = new addRating({
      name,
      mobile,
      email,
      rating,
      message,
    });
    await newRating.save();
    res.status(201).json({ message: "Rating Given Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all ratings
const GetAllRatings = async (req, res) => {
  try {
    const ratings = await addRating.find().lean() // This gets all documents in the Rating collection
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { AddRating, GetAllRatings };
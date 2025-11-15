const PriceLabel = require("../models/priceLabel");

// Create or replace the single price label (upsert)
const createPriceLabel = async (req, res) => {
  const { price3, price12, offerPrice12, offerPercent12 } = req.body;

  try {
    // If you expect only one document, use a fixed filter (empty or a specific key).
    // This will update the first document found or create a new one if none exists.
    const filter = {}; // matches any existing document
    const update = { price3, price12, offerPrice12, offerPercent12 };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };

    const updated = await PriceLabel.findOneAndUpdate(filter, update, options).lean();
    res.status(200).json({ message: "Price label saved", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all price labels
const getAllPriceLabels = async (req, res) => {
  try {
    const labels = await PriceLabel.find().lean();
    res.status(200).json(labels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createPriceLabel, getAllPriceLabels };

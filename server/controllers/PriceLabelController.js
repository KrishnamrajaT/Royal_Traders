const PriceLabel = require("../models/priceLabel");

// Create or replace the single price label (upsert)
const createPriceLabel = async (req, res) => {
  const { price3, price12, offerPrice12, offerPercent12 } = req.body;

  try {
    // If you expect only one document, use a fixed filter (empty or a specific key).
    // We'll merge incoming values onto the existing document so undefined/null
    // request values won't overwrite existing fields.
    const filter = {};

    // Get existing doc if present
    const existing = await PriceLabel.findOne(filter).lean();

    const merged = {
      price3: typeof price3 !== "undefined" && price3 !== null ? price3 : existing?.price3,
      price12: typeof price12 !== "undefined" && price12 !== null ? price12 : existing?.price12,
      offerPrice12:
        typeof offerPrice12 !== "undefined" && offerPrice12 !== null ? offerPrice12 : existing?.offerPrice12,
      offerPercent12:
        typeof offerPercent12 !== "undefined" && offerPercent12 !== null ? offerPercent12 : existing?.offerPercent12,
    };

    const options = { new: true, upsert: true, setDefaultsOnInsert: true };

    const updated = await PriceLabel.findOneAndUpdate(filter, merged, options).lean();
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

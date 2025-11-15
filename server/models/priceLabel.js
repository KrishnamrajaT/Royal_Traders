const mongoose = require("mongoose");

const priceLabelSchema = new mongoose.Schema({
  price3: {
    type: Number,
    required: true,
  },
  price12: {
    type: Number,
    required: true,
    unique: true,
  },
  offerPrice12: {
    type: Number,
    required: true,
  },
  offerPercent12: {
    type: Number,
    required: true,
    unique: true,
  },
});

const PriceLabel = mongoose.models.PriceLabel || mongoose.model("PriceLabel", priceLabelSchema);

module.exports = PriceLabel;

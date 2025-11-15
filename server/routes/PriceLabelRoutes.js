const express = require("express");
const router = express.Router();
const priceLabelController = require("../controllers/PriceLabelController");

router.post("/", priceLabelController.createPriceLabel);
router.get("/", priceLabelController.getAllPriceLabels);

module.exports = router;

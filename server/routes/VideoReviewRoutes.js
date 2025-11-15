const express = require("express");
const router = express.Router();
const videoReviewController = require("../controllers/VideoReviewController");

router.post("/", videoReviewController.createVideoReview);
router.get("/", videoReviewController.getAllVideoReviews);
router.delete("/all", videoReviewController.deleteAllVideoReviews);

module.exports = router;

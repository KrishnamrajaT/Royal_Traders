const ratingController = require("../controllers/RatingController");
const express = require("express");

const router = express.Router();
router.post("/", ratingController.AddRating);
router.get("/", ratingController.GetAllRatings);
router.delete('/:id', ratingController.DeleteRating);




module.exports = router;

const express = require("express");
const auth = require("../middleware/auth");
const {
  createReview,
  getRestaurantReviews,
  getFoodReviews,
  deleteReview,
} = require("../controllers/review.controller");

const router = express.Router();

router.post("/", auth, createReview);
router.get("/restaurant/:restaurantId", getRestaurantReviews);
router.get("/food/:foodId", getFoodReviews);
router.delete("/:id", auth, deleteReview);

module.exports = router;

const Review = require("../models/Review");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");

async function recalcRestaurantRating(restaurantId) {
  const reviews = await Review.find({ restaurant: restaurantId });
  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
  await Restaurant.findByIdAndUpdate(restaurantId, { rating: average });
}

async function recalcFoodRating(foodId) {
  const reviews = await Review.find({ food: foodId });
  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
  await Food.findByIdAndUpdate(foodId, { rating: average });
}

async function createReview(req, res, next) {
  try {
    const { orderId, foodId, rating, comment } = req.body;

    if (!orderId || !rating) {
      return res.status(400).json({ message: "orderId and rating are required" });
    }

    const order = await Order.findOne({ _id: orderId, customer: req.userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "delivered") {
      return res.status(400).json({ message: "You can only review a delivered order" });
    }

    const existing = await Review.findOne({ order: orderId });
    if (existing) {
      return res.status(409).json({ message: "You already reviewed this order" });
    }

    const review = await Review.create({
      customer: req.userId,
      restaurant: order.restaurant,
      food: foodId,
      order: orderId,
      rating,
      comment,
    });

    await recalcRestaurantRating(order.restaurant);
    if (foodId) await recalcFoodRating(foodId);

    res.status(201).json({ review });
  } catch (err) {
    next(err);
  }
}

async function getRestaurantReviews(req, res, next) {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId }).sort({
      createdAt: -1,
    });
    res.json({ reviews });
  } catch (err) {
    next(err);
  }
}

async function getFoodReviews(req, res, next) {
  try {
    const reviews = await Review.find({ food: req.params.foodId }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    next(err);
  }
}

async function deleteReview(req, res, next) {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, customer: req.userId });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await recalcRestaurantRating(review.restaurant);
    if (review.food) await recalcFoodRating(review.food);

    res.json({ message: "Review deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { createReview, getRestaurantReviews, getFoodReviews, deleteReview };

const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");

async function search(req, res, next) {
  try {
    const q = req.query.q;
    if (!q) {
      return res.status(400).json({ message: "Query param 'q' is required" });
    }

    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");

    const [restaurants, foods] = await Promise.all([
      Restaurant.find({ $or: [{ name: regex }, { description: regex }] }),
      Food.find({ $or: [{ name: regex }, { description: regex }, { category: regex }] }),
    ]);

    res.json({ restaurants, foods });
  } catch (err) {
    next(err);
  }
}

async function filter(req, res, next) {
  try {
    const { category, minRating, freeShipping } = req.query;

    const restaurantFilter = {};
    if (minRating !== undefined) restaurantFilter.rating = { $gte: Number(minRating) };
    if (freeShipping === "true") restaurantFilter.freeShipping = true;

    const foodFilter = {};
    if (category) foodFilter.category = category;
    if (minRating !== undefined) foodFilter.rating = { $gte: Number(minRating) };

    const [restaurants, foods] = await Promise.all([
      Restaurant.find(restaurantFilter),
      Food.find(foodFilter),
    ]);

    res.json({ restaurants, foods });
  } catch (err) {
    next(err);
  }
}

async function suggested(req, res, next) {
  try {
    const restaurants = await Restaurant.find({ isOpen: true }).sort({ rating: -1 }).limit(5);
    res.json({ restaurants });
  } catch (err) {
    next(err);
  }
}

module.exports = { search, filter, suggested };

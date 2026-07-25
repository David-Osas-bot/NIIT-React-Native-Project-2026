const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");

async function createRestaurant(req, res, next) {
  try {
    const { name, description, cuisineTags, banner, deliveryTime, freeShipping } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const restaurant = await Restaurant.create({
      owner: req.userId,
      name,
      description,
      cuisineTags,
      banner,
      deliveryTime,
      freeShipping,
    });

    res.status(201).json({ restaurant });
  } catch (err) {
    next(err);
  }
}

async function getRestaurants(req, res, next) {
  try {
    const filter = {};
    if (req.query.open === "true") filter.isOpen = true;

    const restaurants = await Restaurant.find(filter).sort({ rating: -1 });
    res.json({ restaurants });
  } catch (err) {
    next(err);
  }
}

async function getRestaurantById(req, res, next) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const foods = await Food.find({ restaurant: restaurant._id });
    res.json({ restaurant, foods });
  } catch (err) {
    next(err);
  }
}

async function getMyRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "You don't have a restaurant yet" });
    }
    res.json({ restaurant });
  } catch (err) {
    next(err);
  }
}

async function updateRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.params.id, owner: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const { name, description, cuisineTags, banner, deliveryTime, freeShipping, isOpen } = req.body;

    if (name !== undefined) restaurant.name = name;
    if (description !== undefined) restaurant.description = description;
    if (cuisineTags !== undefined) restaurant.cuisineTags = cuisineTags;
    if (banner !== undefined) restaurant.banner = banner;
    if (deliveryTime !== undefined) restaurant.deliveryTime = deliveryTime;
    if (freeShipping !== undefined) restaurant.freeShipping = freeShipping;
    if (isOpen !== undefined) restaurant.isOpen = isOpen;

    await restaurant.save();
    res.json({ restaurant });
  } catch (err) {
    next(err);
  }
}

async function deleteRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    await Food.deleteMany({ restaurant: restaurant._id });
    res.json({ message: "Restaurant deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  getMyRestaurant,
  updateRestaurant,
  deleteRestaurant,
};

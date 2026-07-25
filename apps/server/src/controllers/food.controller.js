const Food = require("../models/Food");
const Restaurant = require("../models/Restaurant");

async function createFood(req, res, next) {
  try {
    const { restaurantId, name, price, category, ingredients, description, sizes, image } = req.body;

    if (!restaurantId || !name || price === undefined) {
      return res.status(400).json({ message: "restaurantId, name and price are required" });
    }

    const restaurant = await Restaurant.findOne({ _id: restaurantId, owner: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found or not owned by you" });
    }

    const food = await Food.create({
      restaurant: restaurantId,
      name,
      price,
      category,
      ingredients,
      description,
      sizes,
      image,
    });

    res.status(201).json({ food });
  } catch (err) {
    next(err);
  }
}

async function getFoods(req, res, next) {
  try {
    const filter = {};
    if (req.query.restaurant) filter.restaurant = req.query.restaurant;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.popular === "true") filter.isPopular = true;

    const foods = await Food.find(filter).sort({ createdAt: -1 });
    res.json({ foods });
  } catch (err) {
    next(err);
  }
}

async function getFoodById(req, res, next) {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.json({ food });
  } catch (err) {
    next(err);
  }
}

async function updateFood(req, res, next) {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const restaurant = await Restaurant.findOne({ _id: food.restaurant, owner: req.userId });
    if (!restaurant) {
      return res.status(403).json({ message: "You don't own this food item's restaurant" });
    }

    const { name, price, category, ingredients, description, sizes, image, isPopular } = req.body;

    if (name !== undefined) food.name = name;
    if (price !== undefined) food.price = price;
    if (category !== undefined) food.category = category;
    if (ingredients !== undefined) food.ingredients = ingredients;
    if (description !== undefined) food.description = description;
    if (sizes !== undefined) food.sizes = sizes;
    if (image !== undefined) food.image = image;
    if (isPopular !== undefined) food.isPopular = isPopular;

    await food.save();
    res.json({ food });
  } catch (err) {
    next(err);
  }
}

async function deleteFood(req, res, next) {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const restaurant = await Restaurant.findOne({ _id: food.restaurant, owner: req.userId });
    if (!restaurant) {
      return res.status(403).json({ message: "You don't own this food item's restaurant" });
    }

    await food.deleteOne();
    res.json({ message: "Food item deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { createFood, getFoods, getFoodById, updateFood, deleteFood };

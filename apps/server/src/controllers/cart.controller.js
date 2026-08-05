const Cart = require("../models/Cart");
const Food = require("../models/Food");

function withTotals(cart) {
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { cart, subtotal };
}

async function getCart(req, res, next) {
  try {
    let cart = await Cart.findOne({ owner: req.userId });
    if (!cart) {
      cart = await Cart.create({ owner: req.userId, items: [] });
    }
    res.json(withTotals(cart));
  } catch (err) {
    next(err);
  }
}

async function addItem(req, res, next) {
  try {
    const { foodId, quantity, size } = req.body;

    if (!foodId) {
      return res.status(400).json({ message: "foodId is required" });
    }

    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    let price = food.price;
    if (size) {
      const sizeOption = food.sizes.find((s) => s.label === size);
      if (sizeOption) price = sizeOption.price;
    }

    let cart = await Cart.findOne({ owner: req.userId });
    if (!cart) {
      cart = await Cart.create({ owner: req.userId, items: [] });
    }

    const existing = cart.items.find(
      (item) => item.food.toString() === foodId && item.size === size
    );

    if (existing) {
      existing.quantity += quantity || 1;
    } else {
      cart.items.push({
        food: food._id,
        restaurant: food.restaurant,
        name: food.name,
        price,
        size,
        quantity: quantity || 1,
      });
    }

    await cart.save();
    res.status(201).json(withTotals(cart));
  } catch (err) {
    next(err);
  }
}

async function updateItem(req, res, next) {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ owner: req.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (quantity <= 0) {
      item.deleteOne();
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.json(withTotals(cart));
  } catch (err) {
    next(err);
  }
}

async function removeItem(req, res, next) {
  try {
    const cart = await Cart.findOne({ owner: req.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.deleteOne();
    await cart.save();
    res.json(withTotals(cart));
  } catch (err) {
    next(err);
  }
}

async function clearCart(req, res, next) {
  try {
    const cart = await Cart.findOne({ owner: req.userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: "Cart cleared" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCart, addItem, updateItem, removeItem, clearCart };

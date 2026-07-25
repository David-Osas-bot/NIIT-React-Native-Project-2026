const Offer = require("../models/Offer");
const Restaurant = require("../models/Restaurant");

async function createOffer(req, res, next) {
  try {
    const { restaurantId, code, discountPercent, description, expiresAt } = req.body;

    if (!code || discountPercent === undefined) {
      return res.status(400).json({ message: "code and discountPercent are required" });
    }

    if (restaurantId) {
      const restaurant = await Restaurant.findOne({ _id: restaurantId, owner: req.userId });
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found or not owned by you" });
      }
    }

    const offer = await Offer.create({
      restaurant: restaurantId,
      code,
      discountPercent,
      description,
      expiresAt,
    });

    res.status(201).json({ offer });
  } catch (err) {
    next(err);
  }
}

async function getOffers(req, res, next) {
  try {
    const now = new Date();
    const offers = await Offer.find({
      active: true,
      $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }],
    }).sort({ createdAt: -1 });

    res.json({ offers });
  } catch (err) {
    next(err);
  }
}

async function deleteOffer(req, res, next) {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    if (offer.restaurant) {
      const restaurant = await Restaurant.findOne({ _id: offer.restaurant, owner: req.userId });
      if (!restaurant) {
        return res.status(403).json({ message: "You don't own this offer's restaurant" });
      }
    }

    await offer.deleteOne();
    res.json({ message: "Offer deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { createOffer, getOffers, deleteOffer };

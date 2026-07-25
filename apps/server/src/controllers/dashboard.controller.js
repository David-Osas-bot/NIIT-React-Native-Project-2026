const Restaurant = require("../models/Restaurant");
const Order = require("../models/Order");
const Review = require("../models/Review");

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

async function getDashboard(req, res, next) {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "You don't have a restaurant yet" });
    }

    const deliveredOrders = await Order.find({ restaurant: restaurant._id, status: "delivered" });

    const revenue = {
      total: deliveredOrders.reduce((sum, o) => sum + o.total, 0),
      today: deliveredOrders
        .filter((o) => o.createdAt >= startOfToday())
        .reduce((sum, o) => sum + o.total, 0),
      thisWeek: deliveredOrders
        .filter((o) => o.createdAt >= daysAgo(7))
        .reduce((sum, o) => sum + o.total, 0),
    };

    const [requests, running, delivered, cancelled] = await Promise.all([
      Order.countDocuments({ restaurant: restaurant._id, status: "placed" }),
      Order.countDocuments({
        restaurant: restaurant._id,
        status: { $in: ["accepted", "preparing", "out_for_delivery"] },
      }),
      Order.countDocuments({ restaurant: restaurant._id, status: "delivered" }),
      Order.countDocuments({ restaurant: restaurant._id, status: "cancelled" }),
    ]);

    const allOrders = await Order.find({ restaurant: restaurant._id });
    const itemCounts = new Map();
    for (const order of allOrders) {
      for (const item of order.items) {
        const key = item.food.toString();
        const existing = itemCounts.get(key) || { food: key, name: item.name, totalQuantity: 0 };
        existing.totalQuantity += item.quantity;
        itemCounts.set(key, existing);
      }
    }
    const popularItems = [...itemCounts.values()]
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 5);

    const reviews = await Review.find({ restaurant: restaurant._id }).sort({ createdAt: -1 });
    const averageRating = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.json({
      restaurant: { id: restaurant._id, name: restaurant.name, balance: restaurant.balance },
      revenue,
      orders: { requests, running, delivered, cancelled },
      popularItems,
      reviews: {
        averageRating,
        totalReviews: reviews.length,
        recent: reviews.slice(0, 5),
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getDashboard };

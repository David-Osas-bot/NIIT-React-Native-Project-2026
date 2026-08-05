const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Address = require("../models/Address");
const Restaurant = require("../models/Restaurant");
const mockProcessPayment = require("../utils/mockPayment");
const notify = require("../utils/notify");

const ACTIVE_STATUSES = ["placed", "accepted", "preparing", "out_for_delivery"];

async function checkout(req, res, next) {
  try {
    const { addressId, paymentMethod } = req.body;

    const cart = await Cart.findOne({ owner: req.userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let addressSnapshot = {};
    if (addressId) {
      const address = await Address.findOne({ _id: addressId, owner: req.userId });
      if (!address) {
        return res.status(404).json({ message: "Address not found" });
      }
      addressSnapshot = {
        label: address.label,
        street: address.street,
        apartment: address.apartment,
        postcode: address.postcode,
        lat: address.lat,
        lng: address.lng,
      };
    }

    // Group cart items by restaurant — an order belongs to a single restaurant
    const groups = new Map();
    for (const item of cart.items) {
      const key = item.restaurant.toString();
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    }

    const createdOrders = [];
    for (const [restaurantId, items] of groups) {
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const deliveryFee = 2;
      const total = subtotal + deliveryFee;

      const order = await Order.create({
        customer: req.userId,
        restaurant: restaurantId,
        items: items.map((item) => ({
          food: item.food,
          name: item.name,
          price: item.price,
          size: item.size,
          quantity: item.quantity,
        })),
        subtotal,
        deliveryFee,
        total,
        address: addressSnapshot,
        paymentMethod: paymentMethod || "cash",
      });

      if (paymentMethod && paymentMethod !== "cash") {
        const result = await mockProcessPayment({ amount: total, method: paymentMethod });
        order.paymentStatus = result.success ? "paid" : "failed";
        await order.save();
      }

      createdOrders.push(order);
    }

    cart.items = [];
    await cart.save();

    res.status(201).json({ orders: createdOrders });
  } catch (err) {
    next(err);
  }
}

async function getMyOrders(req, res, next) {
  try {
    const filter = { customer: req.userId };
    if (req.query.status) filter.status = req.query.status;

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
}

async function getOrderById(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const isOwner = order.customer.toString() === req.userId;
    const isChefOwner =
      req.userRole === "chef" &&
      (await Restaurant.exists({ _id: order.restaurant, owner: req.userId }));

    if (!isOwner && !isChefOwner) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json({ order });
  } catch (err) {
    next(err);
  }
}

async function getIncomingOrders(req, res, next) {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "You don't have a restaurant yet" });
    }

    const filter = { restaurant: restaurant._id };
    filter.status = req.query.status ? req.query.status : { $in: ACTIVE_STATUSES };

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;
    const validStatuses = ["accepted", "preparing", "out_for_delivery", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const restaurant = await Restaurant.findOne({ _id: order.restaurant, owner: req.userId });
    if (!restaurant) {
      return res.status(403).json({ message: "You don't own this order's restaurant" });
    }

    if (["delivered", "cancelled"].includes(order.status)) {
      return res.status(400).json({ message: "Order is already finalized" });
    }

    order.status = status;

    if (status === "delivered") {
      order.paymentStatus = "paid";
      restaurant.balance += order.total;
      await restaurant.save();
    }

    await order.save();

    const io = req.app.get("io");
    await notify(io, order.customer.toString(), {
      type: "order_update",
      title: "Order update",
      body: `Your order is now: ${status.replace(/_/g, " ")}`,
      data: { orderId: order._id, status },
    });

    res.json({ order });
  } catch (err) {
    next(err);
  }
}

async function cancelOrder(req, res, next) {
  try {
    const order = await Order.findOne({ _id: req.params.id, customer: req.userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "placed") {
      return res.status(400).json({ message: "Order can no longer be cancelled" });
    }

    order.status = "cancelled";
    await order.save();
    res.json({ order });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkout,
  getMyOrders,
  getOrderById,
  getIncomingOrders,
  updateOrderStatus,
  cancelOrder,
};

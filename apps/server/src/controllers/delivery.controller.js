const Delivery = require("../models/Delivery");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const notify = require("../utils/notify");
const { haversineDistanceKm } = require("../utils/geocode");

const AVG_SPEED_KMH = 30;

async function assignDriver(req, res, next) {
  try {
    const { orderId, driverId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const restaurant = await Restaurant.findOne({ _id: order.restaurant, owner: req.userId });
    if (!restaurant) {
      return res.status(403).json({ message: "You don't own this order's restaurant" });
    }

    const driver = await User.findOne({ _id: driverId, role: "driver" });
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const delivery = await Delivery.findOneAndUpdate(
      { order: orderId },
      { order: orderId, driver: driverId, status: "assigned" },
      { new: true, upsert: true }
    );

    const io = req.app.get("io");
    await notify(io, order.customer.toString(), {
      type: "order_update",
      title: "Driver assigned",
      body: `${driver.name} will deliver your order`,
      data: { orderId },
    });

    res.status(201).json({ delivery });
  } catch (err) {
    next(err);
  }
}

async function getDelivery(req, res, next) {
  try {
    const delivery = await Delivery.findOne({ order: req.params.orderId });
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    const order = await Order.findById(req.params.orderId);
    const isCustomer = order && order.customer.toString() === req.userId;
    const isDriver = delivery.driver.toString() === req.userId;
    const isChefOwner =
      order && (await Restaurant.exists({ _id: order.restaurant, owner: req.userId }));

    if (!isCustomer && !isDriver && !isChefOwner) {
      return res.status(403).json({ message: "Not authorized to view this delivery" });
    }

    let distanceKm, etaMinutes;
    if (delivery.currentLocation?.lat !== undefined && order?.address?.lat !== undefined) {
      distanceKm = haversineDistanceKm(
        delivery.currentLocation.lat,
        delivery.currentLocation.lng,
        order.address.lat,
        order.address.lng
      );
      etaMinutes = Math.round((distanceKm / AVG_SPEED_KMH) * 60);
    }

    res.json({ delivery, distanceKm, etaMinutes });
  } catch (err) {
    next(err);
  }
}

async function updateLocation(req, res, next) {
  try {
    const { lat, lng } = req.body;

    const delivery = await Delivery.findOne({ order: req.params.orderId, driver: req.userId });
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found or not assigned to you" });
    }

    delivery.currentLocation = { lat, lng };
    await delivery.save();

    const io = req.app.get("io");
    if (io) {
      io.to(`order:${req.params.orderId}`).emit("location:updated", {
        orderId: req.params.orderId,
        lat,
        lng,
      });
    }

    res.json({ delivery });
  } catch (err) {
    next(err);
  }
}

async function updateDeliveryStatus(req, res, next) {
  try {
    const { status } = req.body;
    const validStatuses = ["picked_up", "on_the_way", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const delivery = await Delivery.findOne({ order: req.params.orderId, driver: req.userId });
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found or not assigned to you" });
    }

    delivery.status = status;
    await delivery.save();

    const order = await Order.findById(req.params.orderId);

    if (status === "delivered" && order && order.status !== "delivered") {
      order.status = "delivered";
      order.paymentStatus = "paid";
      await order.save();

      const restaurant = await Restaurant.findById(order.restaurant);
      restaurant.balance += order.total;
      await restaurant.save();
    }

    const io = req.app.get("io");
    if (io) {
      io.to(`order:${req.params.orderId}`).emit("delivery:status", {
        orderId: req.params.orderId,
        status,
      });
    }

    if (order) {
      await notify(io, order.customer.toString(), {
        type: "order_update",
        title: "Delivery update",
        body: `Your order is now: ${status.replace(/_/g, " ")}`,
        data: { orderId: req.params.orderId, status },
      });
    }

    res.json({ delivery });
  } catch (err) {
    next(err);
  }
}

module.exports = { assignDriver, getDelivery, updateLocation, updateDeliveryStatus };

const express = require("express");
const auth = require("../middleware/auth");
const requireChef = require("../middleware/requireChef");
const {
  checkout,
  getMyOrders,
  getOrderById,
  getIncomingOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/order.controller");

const router = express.Router();

router.post("/", auth, checkout);
router.get("/", auth, getMyOrders);
router.get("/incoming", auth, requireChef, getIncomingOrders);
router.get("/:id", auth, getOrderById);
router.put("/:id/status", auth, requireChef, updateOrderStatus);
router.put("/:id/cancel", auth, cancelOrder);

module.exports = router;

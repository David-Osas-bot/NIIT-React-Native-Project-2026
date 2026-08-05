const express = require("express");
const auth = require("../middleware/auth");
const requireChef = require("../middleware/requireChef");
const requireDriver = require("../middleware/requireDriver");
const {
  assignDriver,
  getDelivery,
  updateLocation,
  updateDeliveryStatus,
} = require("../controllers/delivery.controller");

const router = express.Router();

router.post("/", auth, requireChef, assignDriver);
router.get("/:orderId", auth, getDelivery);
router.put("/:orderId/location", auth, requireDriver, updateLocation);
router.put("/:orderId/status", auth, requireDriver, updateDeliveryStatus);

module.exports = router;

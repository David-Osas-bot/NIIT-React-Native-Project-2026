const express = require("express");
const auth = require("../middleware/auth");
const requireChef = require("../middleware/requireChef");
const {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  getMyRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurant.controller");

const router = express.Router();

router.post("/", auth, requireChef, createRestaurant);
router.get("/", getRestaurants);
router.get("/mine", auth, requireChef, getMyRestaurant);
router.get("/:id", getRestaurantById);
router.put("/:id", auth, requireChef, updateRestaurant);
router.delete("/:id", auth, requireChef, deleteRestaurant);

module.exports = router;

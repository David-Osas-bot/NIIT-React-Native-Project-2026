const express = require("express");
const auth = require("../middleware/auth");
const requireChef = require("../middleware/requireChef");
const { createFood, getFoods, getFoodById, updateFood, deleteFood } = require("../controllers/food.controller");

const router = express.Router();

router.post("/", auth, requireChef, createFood);
router.get("/", getFoods);
router.get("/:id", getFoodById);
router.put("/:id", auth, requireChef, updateFood);
router.delete("/:id", auth, requireChef, deleteFood);

module.exports = router;

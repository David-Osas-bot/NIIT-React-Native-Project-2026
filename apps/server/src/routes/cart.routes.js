const express = require("express");
const auth = require("../middleware/auth");
const { getCart, addItem, updateItem, removeItem, clearCart } = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", auth, getCart);
router.post("/items", auth, addItem);
router.put("/items/:itemId", auth, updateItem);
router.delete("/items/:itemId", auth, removeItem);
router.delete("/", auth, clearCart);

module.exports = router;

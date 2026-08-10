const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


// Authentication
router.post("/register", register);
router.post("/login", login);


// Current logged-in user
router.get("/me", authMiddleware, getMe);


// Password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


module.exports = router;
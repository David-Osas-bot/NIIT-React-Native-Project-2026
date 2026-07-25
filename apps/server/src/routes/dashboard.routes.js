const express = require("express");
const auth = require("../middleware/auth");
const requireChef = require("../middleware/requireChef");
const { getDashboard } = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/", auth, requireChef, getDashboard);

module.exports = router;

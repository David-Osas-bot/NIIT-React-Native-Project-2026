const express = require("express");
const auth = require("../middleware/auth");
const requireChef = require("../middleware/requireChef");
const { createOffer, getOffers, deleteOffer } = require("../controllers/offer.controller");

const router = express.Router();

router.post("/", auth, requireChef, createOffer);
router.get("/", getOffers);
router.delete("/:id", auth, requireChef, deleteOffer);

module.exports = router;

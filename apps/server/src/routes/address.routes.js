const express = require("express");
const auth = require("../middleware/auth");
const {
  createAddress,
  getAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
  lookupGeocode,
} = require("../controllers/address.controller");

const router = express.Router();

router.post("/", auth, createAddress);
router.get("/", auth, getAddresses);
router.get("/geocode", auth, lookupGeocode);
router.get("/:id", auth, getAddress);
router.put("/:id", auth, updateAddress);
router.delete("/:id", auth, deleteAddress);

module.exports = router;

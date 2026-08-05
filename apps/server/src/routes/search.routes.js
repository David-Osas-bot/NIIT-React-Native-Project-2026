const express = require("express");
const { search, filter, suggested } = require("../controllers/search.controller");

const router = express.Router();

router.get("/", search);
router.get("/filter", filter);
router.get("/suggested", suggested);

module.exports = router;

const express = require("express");
const auth = require("../middleware/auth");
const { getNotifications, markOneRead, markAllRead } = require("../controllers/notification.controller");

const router = express.Router();

router.get("/", auth, getNotifications);
router.put("/read-all", auth, markAllRead);
router.put("/:id/read", auth, markOneRead);

module.exports = router;

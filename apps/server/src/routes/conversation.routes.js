const express = require("express");
const auth = require("../middleware/auth");
const {
  createConversation,
  getConversations,
  getMessages,
  sendMessage,
  markRead,
} = require("../controllers/conversation.controller");

const router = express.Router();

router.post("/", auth, createConversation);
router.get("/", auth, getConversations);
router.get("/:id/messages", auth, getMessages);
router.post("/:id/messages", auth, sendMessage);
router.put("/:id/read", auth, markRead);

module.exports = router;

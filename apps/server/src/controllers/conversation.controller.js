const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const notify = require("../utils/notify");

async function createConversation(req, res, next) {
  try {
    const { participantId, orderId } = req.body;

    if (!participantId) {
      return res.status(400).json({ message: "participantId is required" });
    }

    const filter = {
      participants: { $all: [req.userId, participantId], $size: 2 },
    };
    if (orderId) filter.order = orderId;

    let conversation = await Conversation.findOne(filter);
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.userId, participantId],
        order: orderId,
      });
    }

    res.status(201).json({ conversation });
  } catch (err) {
    next(err);
  }
}

async function getConversations(req, res, next) {
  try {
    const conversations = await Conversation.find({ participants: req.userId }).sort({
      lastMessageAt: -1,
    });
    res.json({ conversations });
  } catch (err) {
    next(err);
  }
}

async function getMessages(req, res, next) {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      participants: req.userId,
    });
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const messages = await Message.find({ conversation: conversation._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ messages: messages.reverse() });
  } catch (err) {
    next(err);
  }
}

async function sendMessage(req, res, next) {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "text is required" });
    }

    const conversation = await Conversation.findOne({
      _id: req.params.id,
      participants: req.userId,
    });
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const message = await Message.create({
      conversation: conversation._id,
      sender: req.userId,
      text,
      readBy: [req.userId],
    });

    conversation.lastMessage = text;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    const io = req.app.get("io");
    const recipientId = conversation.participants.find((p) => p.toString() !== req.userId);

    if (io && recipientId) {
      io.to(`user:${recipientId}`).emit("chat:message", {
        conversationId: conversation._id,
        message,
      });
    }

    if (recipientId) {
      await notify(io, recipientId, {
        type: "message",
        title: "New message",
        body: text,
        data: { conversationId: conversation._id },
      });
    }

    res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
}

async function markRead(req, res, next) {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      participants: req.userId,
    });
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    await Message.updateMany(
      { conversation: conversation._id, readBy: { $ne: req.userId } },
      { $push: { readBy: req.userId } }
    );

    res.json({ message: "Marked as read" });
  } catch (err) {
    next(err);
  }
}

module.exports = { createConversation, getConversations, getMessages, sendMessage, markRead };

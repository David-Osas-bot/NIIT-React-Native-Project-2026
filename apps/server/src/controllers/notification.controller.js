const Notification = require("../models/Notification");

async function getNotifications(req, res, next) {
  try {
    const filter = { owner: req.userId };
    if (req.query.unread === "true") filter.read = false;

    const notifications = await Notification.find(filter).sort({ createdAt: -1 });
    res.json({ notifications });
  } catch (err) {
    next(err);
  }
}

async function markOneRead(req, res, next) {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json({ notification });
  } catch (err) {
    next(err);
  }
}

async function markAllRead(req, res, next) {
  try {
    await Notification.updateMany({ owner: req.userId, read: false }, { read: true });
    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getNotifications, markOneRead, markAllRead };

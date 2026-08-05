const Notification = require("../models/Notification");

// Shared by any module that needs to alert a user (order updates, new
// messages, promos). Persists the notification and, if a socket server was
// passed in, pushes it live to the user's room too.
async function notify(io, userId, { type, title, body, data }) {
  const notification = await Notification.create({ owner: userId, type, title, body, data });

  if (io) {
    io.to(`user:${userId}`).emit("notification:new", { notification });
  }

  return notification;
}

module.exports = notify;

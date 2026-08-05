const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

// Real-time layer shared by Delivery Tracking, Messaging, and WebRTC call
// signaling. Every authenticated user joins a personal room `user:<id>` so
// any part of the app can push events to them by userId alone.
function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token provided"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      socket.userRole = decoded.role;
      next();
    } catch (err) {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    socket.join(`user:${socket.userId}`);

    // Live location pings from the delivery driver's app, relayed to
    // whoever else is watching this order (the customer).
    socket.on("location:update", ({ orderId, lat, lng }) => {
      io.to(`order:${orderId}`).emit("location:updated", { orderId, lat, lng });
    });

    socket.on("order:subscribe", ({ orderId }) => {
      socket.join(`order:${orderId}`);
    });

    // WebRTC signaling relay — the server never touches the audio itself,
    // it just passes offer/answer/ICE candidates between the two peers.
    ["call:offer", "call:answer", "call:ice-candidate", "call:end"].forEach((event) => {
      socket.on(event, ({ toUserId, payload }) => {
        io.to(`user:${toUserId}`).emit(event, { fromUserId: socket.userId, payload });
      });
    });
  });

  return io;
}

module.exports = initSocket;

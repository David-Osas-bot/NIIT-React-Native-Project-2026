function requireDriver(req, res, next) {
  if (req.userRole !== "driver") {
    return res.status(403).json({ message: "Driver role required" });
  }
  next();
}

module.exports = requireDriver;

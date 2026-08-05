function requireChef(req, res, next) {
  if (req.userRole !== "chef") {
    return res.status(403).json({ message: "Chef role required" });
  }
  next();
}

module.exports = requireChef;

const dns = require("dns");
const mongoose = require("mongoose");

// Some local/router DNS servers can't resolve MongoDB Atlas's SRV records.
// Point Node's resolver at Google's public DNS just for this process.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
}

module.exports = connectDB;

const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed"], default: "completed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Withdrawal", withdrawalSchema);

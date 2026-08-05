const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    label: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
    street: { type: String, required: true },
    apartment: { type: String },
    postcode: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);

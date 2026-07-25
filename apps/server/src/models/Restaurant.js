const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    cuisineTags: [{ type: String }],
    banner: { type: String },
    deliveryTime: { type: String },
    freeShipping: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    isOpen: { type: Boolean, default: true },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);

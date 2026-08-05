const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    ingredients: [{ type: String }],
    description: { type: String },
    sizes: [
      {
        label: { type: String },
        price: { type: Number },
      },
    ],
    image: { type: String },
    isPopular: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);

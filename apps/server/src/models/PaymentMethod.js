const mongoose = require("mongoose");

// Never store full card numbers or CVC here. Once a real gateway (Stripe/
// Paystack/etc.) is wired up, `gatewayToken` holds its tokenized reference —
// only display-safe metadata (brand, last4) lives in our own database.
const paymentMethodSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["card", "paypal", "cash"], required: true },
    brand: { type: String },
    last4: { type: String },
    cardHolderName: { type: String },
    expiryMonth: { type: Number },
    expiryYear: { type: Number },
    gatewayToken: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentMethod", paymentMethodSchema);

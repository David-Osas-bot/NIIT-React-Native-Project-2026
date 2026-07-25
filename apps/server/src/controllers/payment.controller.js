const PaymentMethod = require("../models/PaymentMethod");
const Restaurant = require("../models/Restaurant");
const Withdrawal = require("../models/Withdrawal");
const Order = require("../models/Order");
const mockProcessPayment = require("../utils/mockPayment");

function detectBrand(cardNumber) {
  if (!cardNumber) return undefined;
  const firstDigit = cardNumber.trim()[0];
  if (firstDigit === "4") return "Visa";
  if (firstDigit === "5") return "MasterCard";
  return "Card";
}

// Note: cardNumber/cvc arrive in the request but are deliberately never
// persisted. Only last4 + brand are kept — real card storage requires a
// PCI-compliant gateway (Stripe/Paystack), not our own database.
async function addPaymentMethod(req, res, next) {
  try {
    const { type, cardHolderName, cardNumber, expiryMonth, expiryYear, isDefault } = req.body;

    if (!type) {
      return res.status(400).json({ message: "type is required" });
    }

    if (isDefault) {
      await PaymentMethod.updateMany({ owner: req.userId }, { isDefault: false });
    }

    const method = await PaymentMethod.create({
      owner: req.userId,
      type,
      brand: type === "card" ? detectBrand(cardNumber) : undefined,
      last4: type === "card" && cardNumber ? cardNumber.trim().slice(-4) : undefined,
      cardHolderName,
      expiryMonth,
      expiryYear,
      isDefault: !!isDefault,
    });

    res.status(201).json({ paymentMethod: method });
  } catch (err) {
    next(err);
  }
}

async function getPaymentMethods(req, res, next) {
  try {
    const methods = await PaymentMethod.find({ owner: req.userId }).sort({ createdAt: -1 });
    res.json({ paymentMethods: methods });
  } catch (err) {
    next(err);
  }
}

async function deletePaymentMethod(req, res, next) {
  try {
    const method = await PaymentMethod.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!method) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    res.json({ message: "Payment method deleted" });
  } catch (err) {
    next(err);
  }
}

async function payForOrder(req, res, next) {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({ _id: orderId, customer: req.userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "Order is already paid" });
    }

    const result = await mockProcessPayment({ amount: order.total, method: order.paymentMethod });

    order.paymentStatus = result.success ? "paid" : "failed";
    await order.save();

    res.json({ success: result.success, transactionId: result.transactionId, order });
  } catch (err) {
    next(err);
  }
}

async function getBalance(req, res, next) {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "You don't have a restaurant yet" });
    }
    res.json({ balance: restaurant.balance });
  } catch (err) {
    next(err);
  }
}

async function requestWithdrawal(req, res, next) {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "A valid amount is required" });
    }

    const restaurant = await Restaurant.findOne({ owner: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "You don't have a restaurant yet" });
    }

    if (amount > restaurant.balance) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    restaurant.balance -= amount;
    await restaurant.save();

    const withdrawal = await Withdrawal.create({
      restaurant: restaurant._id,
      amount,
      status: "completed",
    });

    res.status(201).json({ withdrawal, remainingBalance: restaurant.balance });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addPaymentMethod,
  getPaymentMethods,
  deletePaymentMethod,
  payForOrder,
  getBalance,
  requestWithdrawal,
};

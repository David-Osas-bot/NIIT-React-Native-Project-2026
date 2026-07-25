const express = require("express");
const auth = require("../middleware/auth");
const requireChef = require("../middleware/requireChef");
const {
  addPaymentMethod,
  getPaymentMethods,
  deletePaymentMethod,
  payForOrder,
  getBalance,
  requestWithdrawal,
} = require("../controllers/payment.controller");

const router = express.Router();

router.post("/methods", auth, addPaymentMethod);
router.get("/methods", auth, getPaymentMethods);
router.delete("/methods/:id", auth, deletePaymentMethod);
router.post("/pay", auth, payForOrder);
router.get("/balance", auth, requireChef, getBalance);
router.post("/withdraw", auth, requireChef, requestWithdrawal);

module.exports = router;

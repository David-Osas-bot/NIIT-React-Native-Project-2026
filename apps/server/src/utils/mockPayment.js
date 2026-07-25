// Stand-in for a real payment gateway (Stripe/Paystack/Flutterwave).
// No gateway account is wired up yet, so this always "succeeds" instead of
// actually moving money. Swap the body of this function for a real API call
// once a gateway is set up — callers don't need to change.
async function mockProcessPayment({ amount, method }) {
  return {
    success: true,
    transactionId: `mock_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    amount,
    method,
  };
}

module.exports = mockProcessPayment;

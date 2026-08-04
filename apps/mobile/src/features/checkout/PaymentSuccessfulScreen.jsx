import { apiRequest } from '../../shared/api';

export async function processPaystackPayment({ reference, paymentMethod, amount }) {
  try {
    const response = await apiRequest('/payments/pay', {
      method: 'POST',
      data: {
        reference,
        paymentMethod, // e.g., 'card' or 'bank_transfer'
        amount,
      },
    });
    return response;
  } catch (error) {
    console.error('Payment verification failed:', error);
    throw error;
  }
}
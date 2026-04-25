import Razorpay from 'razorpay';
import {config} from '../config/config.js';

const razorpayInstance = new Razorpay({
  key_id: config.Razorpay_KEY_ID,
  key_secret: config.Razorpay_KEY_SECRET,
});

export const createOrder = async (amount, currency="INR") => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Invalid amount provided for order creation');
  }
  try {
    const options = {
        amount: Math.round(amount * 100), // Amount in paise, rounded to avoid floating point issues
        currency: currency,
        receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpayInstance.orders.create(options);
    return order;
  }
    catch (error) {
        console.error('Razorpay Order Creation Error Detail:', error);
        throw new Error(error.message || 'Failed to create Razorpay order');
    }
};
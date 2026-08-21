const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    quantity: Number,
    price: Number,
  }],
  shippingAddress: { type: String, required: true },
  paymentMethod: String,
  totalPrice: Number,
  status: { type: String, default: 'Processing' },
}, { timestamps: true });
module.exports = mongoose.model('Order', OrderSchema);
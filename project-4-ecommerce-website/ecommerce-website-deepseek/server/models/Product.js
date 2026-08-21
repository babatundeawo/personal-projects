const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  stock: { type: Number, default: 0 },
  image: String,
  description: String,
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema);
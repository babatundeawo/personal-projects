/**
 * Example Mongoose Product Schema
 * Uncomment and use when connecting MongoDB
 */

/*
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  stock: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  tags: [String]
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
*/

export default {};

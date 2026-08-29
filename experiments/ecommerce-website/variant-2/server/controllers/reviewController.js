const Review = require('../models/Review');
const Product = require('../models/Product');
exports.addReview = async (req, res) => {
  const { productId, rating, comment } = req.body;
  try {
    const review = new Review({ product: productId, user: req.user._id, rating, comment });
    await review.save();
    // Update product rating
    const reviews = await Review.find({ product: productId });
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(productId, { rating: avg, numReviews: reviews.length });
    res.status(201).json(review);
  } catch (err) { res.status(400).json({ msg: err.message }); }
};
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};
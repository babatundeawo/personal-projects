const Wishlist = require('../models/Wishlist');
exports.getWishlist = async (req, res) => {
  let wl = await Wishlist.findOne({ user: req.user._id }).populate('products');
  if (!wl) wl = { products: [] };
  res.json(wl.products);
};
exports.addToWishlist = async (req, res) => {
  let wl = await Wishlist.findOne({ user: req.user._id });
  if (!wl) { wl = new Wishlist({ user: req.user._id, products: [] }); }
  if (!wl.products.includes(req.params.productId)) wl.products.push(req.params.productId);
  await wl.save();
  res.json(wl);
};
exports.removeFromWishlist = async (req, res) => {
  let wl = await Wishlist.findOne({ user: req.user._id });
  if (wl) {
    wl.products = wl.products.filter(p => p.toString() !== req.params.productId);
    await wl.save();
  }
  res.json(wl);
};
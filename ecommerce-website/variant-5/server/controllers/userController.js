import User from '../models/User.js';

// GET /api/users/wishlist
export async function getWishlist(req, res, next) {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    next(err);
  }
}

// POST /api/users/wishlist/:productId
export async function toggleWishlist(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    const idx = user.wishlist.findIndex((id) => id.toString() === req.params.productId);
    let added;
    if (idx === -1) {
      user.wishlist.push(req.params.productId);
      added = true;
    } else {
      user.wishlist.splice(idx, 1);
      added = false;
    }
    await user.save();
    res.json({ added, wishlist: user.wishlist });
  } catch (err) {
    next(err);
  }
}

// GET /api/users  (admin)
export async function listUsers(req, res, next) {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    res.json({ users });
  } catch (err) {
    next(err);
  }
}

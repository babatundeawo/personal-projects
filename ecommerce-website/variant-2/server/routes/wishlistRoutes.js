const express = require('express');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const auth = require('../middleware/auth');
const router = express.Router();
router.get('/', auth, getWishlist);
router.post('/:productId', auth, addToWishlist);
router.delete('/:productId', auth, removeFromWishlist);
module.exports = router;
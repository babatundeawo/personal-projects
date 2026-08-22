import { Router } from 'express';
import { getWishlist, toggleWishlist, listUsers } from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:productId', protect, toggleWishlist);
router.get('/', protect, adminOnly, listUsers);

export default router;

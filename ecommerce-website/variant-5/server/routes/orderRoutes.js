import { Router } from 'express';
import {
  placeOrder,
  myOrders,
  getOrder,
  listAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, placeOrder);
router.get('/mine', protect, myOrders);
router.get('/', protect, adminOnly, listAllOrders);
router.get('/:id', protect, getOrder);
router.patch('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;

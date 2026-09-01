const express = require('express');
const { getAllProducts, getAllOrders } = require('../controllers/adminController');
const { createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { updateOrderStatus } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/products', auth, admin, getAllProducts);
router.post('/products', auth, admin, createProduct);
router.put('/products/:id', auth, admin, updateProduct);
router.delete('/products/:id', auth, admin, deleteProduct);
router.get('/orders', auth, admin, getAllOrders);
router.put('/orders/:id', auth, admin, updateOrderStatus);

module.exports = router;
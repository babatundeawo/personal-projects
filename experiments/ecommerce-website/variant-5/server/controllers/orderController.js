import Order from '../models/Order.js';
import Product from '../models/Product.js';

// POST /api/orders  — creates an order from the cart sent by the client
// Payment here is mocked: it always "succeeds" once items pass validation.
// To wire up real Stripe payments: create a PaymentIntent with STRIPE_SECRET_KEY,
// confirm it on the client, then only call this endpoint after Stripe confirms.
export async function placeOrder(req, res, next) {
  try {
    const { items, shippingAddress } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' });
    }

    // Re-price and re-check stock server-side — never trust client-sent prices.
    const resolvedItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `A product in your cart no longer exists.` });
      }
      if (product.stock < item.quantity) {
        return res.status(409).json({ message: `Not enough stock for "${product.name}".` });
      }
      resolvedItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0] || '',
        price: product.price,
        quantity: item.quantity
      });
    }

    const itemsTotal = resolvedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shippingFee = itemsTotal > 100 ? 0 : 7.99;
    const total = Number((itemsTotal + shippingFee).toFixed(2));

    const order = await Order.create({
      user: req.user._id,
      items: resolvedItems,
      shippingAddress,
      itemsTotal,
      shippingFee,
      total,
      isPaid: true,
      paidAt: new Date(),
      status: 'processing'
    });

    // Reduce stock now that payment has "succeeded"
    await Promise.all(
      resolvedItems.map((i) =>
        Product.findByIdAndUpdate(i.product, { $inc: { stock: -i.quantity } })
      )
    );

    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
}

// GET /api/orders/mine
export async function myOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json({ orders });
  } catch (err) {
    next(err);
  }
}

// GET /api/orders/:id
export async function getOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    const isOwner = order.user.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order.' });
    }
    res.json({ order });
  } catch (err) {
    next(err);
  }
}

// GET /api/orders  (admin — all orders)
export async function listAllOrders(req, res, next) {
  try {
    const orders = await Order.find().populate('user', 'name email').sort('-createdAt');
    res.json({ orders });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/orders/:id/status  (admin)
export async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;
    const allowed = ['processing', 'shipped', 'delivered', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${allowed.join(', ')}` });
    }
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json({ order });
  } catch (err) {
    next(err);
  }
}

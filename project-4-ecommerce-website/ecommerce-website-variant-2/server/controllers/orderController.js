const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendOrderConfirmation } = require('../utils/emailService');

exports.createOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;
  try {
    const orderItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);
      product.stock -= item.quantity;
      await product.save();
      return { product: product._id, name: product.name, quantity: item.quantity, price: item.price };
    }));
    const totalPrice = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = new Order({ user: req.user._id, items: orderItems, shippingAddress, paymentMethod, totalPrice });
    await order.save();
    await sendOrderConfirmation(req.user.email, order);
    res.status(201).json(order);
  } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.getUserOrders = async (req, res) => { try { res.json(await Order.find({ user: req.user._id })); } catch (err) { res.status(500).json({ msg: err.message }); } };
exports.updateOrderStatus = async (req, res) => { try { const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }); res.json(order); } catch (err) { res.status(400).json({ msg: err.message }); } };
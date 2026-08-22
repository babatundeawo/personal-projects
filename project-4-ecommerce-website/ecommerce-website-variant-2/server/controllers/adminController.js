const Product = require('../models/Product');
const Order = require('../models/Order');
exports.getAllProducts = async (req, res) => { try { res.json(await Product.find({})); } catch (err) { res.status(500).json({ msg: err.message }); } };
exports.getAllOrders = async (req, res) => { try { res.json(await Order.find({}).populate('user', 'username')); } catch (err) { res.status(500).json({ msg: err.message }); } };
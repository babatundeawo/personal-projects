const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });
    const user = await User.create({ username, email, password });
    res.status(201).json({ token: generateToken(user._id), user: { id: user._id, username, email, isAdmin: user.isAdmin } });
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(400).json({ msg: 'Invalid credentials' });
    res.json({ token: generateToken(user._id), user: { id: user._id, username: user.username, email, isAdmin: user.isAdmin } });
  } catch (err) { res.status(500).json({ msg: err.message }); }
};
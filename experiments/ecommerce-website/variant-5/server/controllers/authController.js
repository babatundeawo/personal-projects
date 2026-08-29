import User from '../models/User.js';
import { signToken } from '../middleware/authMiddleware.js';

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    address: user.address || null
  };
}

// POST /api/auth/register
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are all required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'An account with that email already exists.' });
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    res.status(201).json({ user: publicUser(user), token });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = signToken(user._id);
    res.json({ user: publicUser(user), token });
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me
export async function getProfile(req, res) {
  res.json({ user: publicUser(req.user) });
}

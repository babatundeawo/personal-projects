/**
 * ShopEase Backend Skeleton
 *
 * To run a real backend:
 * 1. npm install
 * 2. Create a .env file with:
 *    MONGODB_URI=your_mongodb_atlas_or_local_uri
 *    JWT_SECRET=your_secret_key
 *    PORT=5000
 * 3. Implement the controllers using the models
 * 4. npm run dev
 *
 * This file currently starts a basic Express server with example routes.
 * Connect your React client by changing API base URL in services.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ShopEase API is running' });
});

// Example product route (replace with real DB later)
app.get('/api/products', (req, res) => {
  res.json({ message: 'Connect MongoDB and implement Product controller' });
});

// Auth placeholders
app.post('/api/auth/register', (req, res) => {
  res.status(501).json({ message: 'Implement register with bcrypt + JWT' });
});

app.post('/api/auth/login', (req, res) => {
  res.status(501).json({ message: 'Implement login with bcrypt + JWT' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('This is a skeleton – add MongoDB models & controllers to go full-stack.');
});

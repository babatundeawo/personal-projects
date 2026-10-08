import { api } from '../api/client.js';

export const wishlistService = {
  get: () => api.get('/users/wishlist', { auth: true }),
  toggle: (productId) => api.post(`/users/wishlist/${productId}`, null, { auth: true })
};

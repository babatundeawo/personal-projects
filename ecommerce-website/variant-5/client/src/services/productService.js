import { api } from '../api/client.js';

export const productService = {
  list: (params = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''))
    ).toString();
    return api.get(`/products${query ? `?${query}` : ''}`);
  },
  get: (slug) => api.get(`/products/${slug}`),
  create: (payload) => api.post('/products', payload, { auth: true }),
  update: (id, payload) => api.put(`/products/${id}`, payload, { auth: true }),
  remove: (id) => api.delete(`/products/${id}`, { auth: true }),
  addReview: (slug, payload) => api.post(`/products/${slug}/reviews`, payload, { auth: true })
};

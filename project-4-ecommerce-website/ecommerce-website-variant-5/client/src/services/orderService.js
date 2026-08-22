import { api } from '../api/client.js';

export const orderService = {
  place: (payload) => api.post('/orders', payload, { auth: true }),
  mine: () => api.get('/orders/mine', { auth: true }),
  get: (id) => api.get(`/orders/${id}`, { auth: true }),
  listAll: () => api.get('/orders', { auth: true }),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }, { auth: true })
};

// src/services/orderService.js
import axios from 'axios'

const API_URL = '/api/orders'

// Create axios instance with default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const orderService = {
  // Get all user orders (based on role)
  getUserOrders: async () => {
    const response = await api.get('/my-orders')
    return response.data
  },

  // Get order by id
  getOrderById: async (orderId) => {
    const response = await api.get(`/${orderId}`)
    return response.data
  },

  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post('/', orderData)
    return response.data
  },

  // Update order status (for farmers)
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/${orderId}/status`, { status })
    return response.data
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    const response = await api.put(`/${orderId}/cancel`)
    return response.data
  },

  // For admin: get all orders
  getAllOrders: async (page = 1, limit = 20, filters = {}) => {
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...filters
    }).toString()
    
    const response = await api.get(`/admin?${queryParams}`)
    return response.data
  }
}

export default orderService
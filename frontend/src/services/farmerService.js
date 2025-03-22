// src/services/farmerService.js
import axios from 'axios'

const API_URL = '/api/farmers'

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

const farmerService = {
  // Get all farmers
  getAllFarmers: async () => {
    const response = await api.get('/')
    return response.data
  },

  // Get farmers by location (city, radius)
  getFarmersByLocation: async (city, radius = 50) => {
    const response = await api.get(`/search?city=${city}&radius=${radius}`)
    return response.data
  },

  // Get farmer by id
  getFarmerById: async (farmerId) => {
    const response = await api.get(`/${farmerId}`)
    return response.data
  },

  // Create farmer profile (for farmers)
  createFarmerProfile: async (profileData) => {
    const response = await api.post('/', profileData)
    return response.data
  },

  // Update farmer profile (for farmers)
  updateFarmerProfile: async (profileData) => {
    const response = await api.put('/', profileData)
    return response.data
  },

  // Get farmer's products
  getFarmerProducts: async (farmerId) => {
    const response = await api.get(`/${farmerId}/products`)
    return response.data
  },

  // Add product (for farmers)
  addProduct: async (productData) => {
    const response = await api.post('/products', productData)
    return response.data
  },

  // Update product (for farmers)
  updateProduct: async (productId, productData) => {
    const response = await api.put(`/products/${productId}`, productData)
    return response.data
  },

  // Delete product (for farmers)
  deleteProduct: async (productId) => {
    const response = await api.delete(`/products/${productId}`)
    return response.data
  },

  // Get farmer reviews
  getFarmerReviews: async (farmerId) => {
    const response = await api.get(`/${farmerId}/reviews`)
    return response.data
  },

  // Add review (for consumers)
  addReview: async (farmerId, reviewData) => {
    const response = await api.post(`/${farmerId}/reviews`, reviewData)
    return response.data
  }
}

export default farmerService
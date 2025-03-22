// src/services/authService.js
import axios from 'axios'

const API_URL = '/api/auth'

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

const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/register', userData)
    return response.data
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post('/login', { email, password })
    return response.data
  },

  // Get current user data
  getCurrentUser: async () => {
    const response = await api.get('/me')
    return response.data
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/profile', profileData)
    return response.data
  },

  // Update user password
  updatePassword: async (passwordData) => {
    const response = await api.put('/password', passwordData)
    return response.data
  }
}

export default authService
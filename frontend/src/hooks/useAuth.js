// src/hooks/useAuth.js
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Track auth status
  const navigate = useNavigate()

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      )

      const token = res.data.token
      const user = res.data.user

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      // 🎯 Redirect based on user role
      switch (user.role) {
        case 'admin':
          navigate('/admin-panel', { replace: true })
          break
        case 'farmer':
          navigate('/farmer/dashboard', { replace: true })
          break
        case 'consumer':
        default:
          navigate('/dashboard', { replace: true })
          break
      }

      return user
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    // Optional: await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`)
  }

  return { login, logout, checkAuthStatus, isAuthenticated, error }
}

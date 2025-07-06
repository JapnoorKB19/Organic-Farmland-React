// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react'
import authService from '../services/authService'
import axois from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const login = async (email, password) => {
    try {
      setError(null)
      console.log("AuthContext: Attempting login via authService...");
      const response = await authService.login(email, password)

      // --- ADD THESE LOGS HERE ---
      console.log("AuthContext: Received response from authService.login:", response);
      console.log("AuthContext: Token from response:", response.token);
      console.log("AuthContext: User from response:", response.user);
      // --- END ADDED LOGS ---
      
      localStorage.setItem('token', response.token)
      console.log("AuthContext: localStorage token after set:", localStorage.getItem('token'));

      localStorage.setItem('user', JSON.stringify(response.user)); // <-- FIX THIS LINE
      console.log("AuthContext: localStorage user after set:", localStorage.getItem('user'));

      setUser(response.user)
      setIsAuthenticated(true)
      
      return response.user
    } catch (err) {
      console.error("AuthContext: Login error caught:", err);
      setError(err.response?.data?.message || 'Login failed')
      throw err
    }
  }

  const register = async (userData) => {
    try {
      setError(null)
      const response = await authService.register(userData)
      
      localStorage.setItem('token', response.token)
      setUser(response.user)
      setIsAuthenticated(true)
      
      return response.user
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      throw err
    }
  }

  const fetchMe = async () => {
  const token = localStorage.getItem("token"); // or however you store it
  const res = await axios.get("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data); // your logged-in user
};


  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  const checkAuthStatus = async () => {
    setLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      console.log("AuthContext: checkAuthStatus - token in localStorage:", token);
      if (!token) {
        console.log("AuthContext: No token found in localStorage.");
        setLoading(false)
        return
      }
      console.log("AuthContext: Attempting getCurrentUser via authService...");
      const response = await authService.getCurrentUser()
      console.log("AuthContext: Received response from authService.getCurrentUser:", response);

      setUser(response.user)
      setIsAuthenticated(true)
      console.log("AuthContext: User set from checkAuthStatus:", response.user);
    } catch (err) {
      console.error("AuthContext: checkAuthStatus error caught:", err); 
      localStorage.removeItem('token')
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
      console.log("AuthContext: checkAuthStatus finished. Loading set to false.");
    }
  }

  useEffect(() => {
    console.log("AuthContext: Initializing checkAuthStatus on mount.");
    checkAuthStatus()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        fetchMe,
        logout,
        checkAuthStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
};
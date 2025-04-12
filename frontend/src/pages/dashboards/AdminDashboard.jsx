// src/pages/dashboards/AdminDashboard.jsx
import React, { useEffect, useState } from 'react'
import { Button, Typography, Box, Snackbar, Alert } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const AdminDashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const userName = location.state?.user || 'Admin'
  const [openSnackbar, setOpenSnackbar] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    const timer = setTimeout(() => setOpenSnackbar(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Box p={4}>
      {/* Welcome Snackbar */}
      <Snackbar open={openSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
          Welcome back, {userName}! 🔐📊
        </Alert>
      </Snackbar>

      {/* Dashboard Content */}
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography>
        Manage users, products, and site activity from here.
      </Typography>

      {/* Add admin management tools here */}

      <Button variant="contained" color="error" sx={{ mt: 4 }} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  )
}

export default AdminDashboard

// src/pages/dashboards/FarmerDashboard.jsx
import React, { useEffect, useState } from 'react'
import { Button, Typography, Box, Snackbar, Alert } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const FarmerDashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const userName = location.state?.user || 'Farmer'
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
        `Hi ${userName}, your organic fields are calling! 🌾🐝`
        </Alert>
      </Snackbar>

      {/* Dashboard Content */}
      <Typography variant="h4" gutterBottom>
        Farmer Dashboard
      </Typography>
      <Typography>
        Welcome! Here you can manage your organic products and connect with consumers.
      </Typography>

      {/* Product management section placeholder */}
      {/* Add your logic here */}
      
      <Button variant="contained" color="error" sx={{ mt: 4 }} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  )
}

export default FarmerDashboard
